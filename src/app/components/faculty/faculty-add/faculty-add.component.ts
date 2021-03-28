import { Location } from '@angular/common';
import { FacultyService } from './../../../services/faculty.service';
import { Faculty } from './../../../models/faculty.model';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-faculty-add',
  templateUrl: './faculty-add.component.html',
  styleUrls: ['./faculty-add.component.css']
})
export class FacultyAddComponent implements OnInit {
  faculty: Faculty = {
    faculty_name:""
  }
  submitted = false;
  role = localStorage.getItem("role");


  constructor(
    private facultyService: FacultyService,
    private _location: Location,
    private loginService: LoginService) { }

  ngOnInit(): void {
  }

  saveFaculty(): void {
    const data = {
      faculty_name: this.faculty.faculty_name,
    };

    this.facultyService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newFaculty(): void {
    this.submitted = false;
    this.faculty = {
      faculty_name: ''
    };
  }

  backClicked() {
    this._location.back();
  }

  logout() {
    this.loginService.logout();
    
  }
}
