import { Component, OnInit } from '@angular/core';
import { Faculty } from 'src/app/models/faculty.model';
import { FacultyService } from 'src/app/services/faculty.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-faculties-list',
  templateUrl: './faculties-list.component.html',
  styleUrls: ['./faculties-list.component.css']
})
export class FacultiesListComponent implements OnInit {
  faculties?: Faculty[];
  currentFaculty?: Faculty;
  currentIndex = -1;
  title = '';
  role = localStorage.getItem("role");


  constructor(private facultyService: FacultyService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.retrieveFaculties();
  }

  retrieveFaculties(): void {
    this.facultyService.getAll()
      .subscribe(
        data => {
          this.faculties = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveFaculties();
    this.currentFaculty = undefined;
    this.currentIndex = -1;
  }

  setActiveFaculty(faculty: Faculty, index: number): void {
    this.currentFaculty = faculty;
    this.currentIndex = index;
  }

  removeAllFaculties(): void {
    this.facultyService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchFaculty(): void {
    this.facultyService.findByName(this.title)
      .subscribe(
        data => {
          this.faculties = data;
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
