import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FileUpload } from 'src/app/models/file.model';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  currentUser: User = {
    faculty: "",
    role: "",
    username: "",
    password: "",
    email: "",
    telephone: "",
    avatar_path: "",
    birthday: "",
    sex_boolean: true
  };
  message = '';
  show: any;
  birthday: NgbDateStruct;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  role = localStorage.getItem("role");


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: FileUploadService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.params.id);
    this.show = false;

  }

  getUser(id: number): void {
    this.userService.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          this.birthday = {
            day: parseInt(this.currentUser.birthday.substring(8,10)),
            month: parseInt(this.currentUser.birthday.substring(5,7)),
            year: parseInt(this.currentUser.birthday.substring(0,4))
          }
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateUser(): void {
    this.currentUser.birthday = new Date(this.birthday.year, this.birthday.month-1, this.birthday.day+1).toISOString().substring(0, 10);
    if(this.currentFileUpload != undefined){
      this.currentUser.avatar_path = this.currentFileUpload.url;
    }
    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
          console.log(this.currentUser.birthday);
        });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }

  password() {
    this.show = !this.show;
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }

  logout() {
    this.loginService.logout();
    
  }
}
