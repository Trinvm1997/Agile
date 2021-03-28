import { Faculty } from './../../../models/faculty.model';
import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-faculty-details',
  templateUrl: './faculty-details.component.html',
  styleUrls: ['./faculty-details.component.css']
})
export class FacultyDetailsComponent implements OnInit {
  currentFaculty: Faculty = {
    faculty_name: ''
  };
  message = '';
  role = localStorage.getItem("role");


  constructor(
    private facultyService: FacultyService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.message = '';
    this.getFaculty(this.route.snapshot.params.id);
  }

  getFaculty(id: number): void {
    this.facultyService.get(id)
      .subscribe(
        data => {
          this.currentFaculty = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateFaculty(): void {
    this.facultyService.update(this.currentFaculty.id, this.currentFaculty)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  deleteFaculty(): void {
    this.facultyService.delete(this.currentFaculty.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/faculties']);
        },
        error => {
          console.log(error);
        });
  }

  logout() {
    this.loginService.logout();
    
  }
}
