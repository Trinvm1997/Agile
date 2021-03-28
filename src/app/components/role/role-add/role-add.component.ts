import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {
  role: Role = {
    role_name:""
  };
  submitted = false;
  rolec = localStorage.getItem("role");


  constructor(
    private roleService: RoleService,
    private _location: Location,
    private loginService: LoginService) { }

  ngOnInit(): void {
  }

  saveRole(): void {
    const data = {
      role_name: this.role.role_name,
    };

    this.roleService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newRole(): void {
    this.submitted = false;
    this.role = {
      role_name: ''
    };
  }

  backClicked() {
    this._location.back();
  }

  logout() {
    this.loginService.logout();
    
  }
}
