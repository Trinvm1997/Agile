import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role.model';
import { LoginService } from 'src/app/services/login.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {
  roles?: Role[];
  currentRole?: Role;
  currentIndex = -1;
  title = '';
  role = localStorage.getItem("role");


  constructor(private roleService: RoleService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.retrieveRoles();
  }

  retrieveRoles(): void {
    this.roleService.getAll()
      .subscribe(
        data => {
          this.roles = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveRoles();
    this.currentRole = undefined;
    this.currentIndex = -1;
  }

  setActiveRole(role: Role, index: number): void {
    this.currentRole = role;
    this.currentIndex = index;
  }

  removeAllRoles(): void {
    this.roleService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchRole(): void {
    this.roleService.findByName(this.title)
      .subscribe(
        data => {
          this.roles = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  logout() {
    this.loginService.logout();
    
  }
}
