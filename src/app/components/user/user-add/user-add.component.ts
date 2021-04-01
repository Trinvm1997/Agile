import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FileUpload } from 'src/app/models/file.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  user: User = {
    faculty: "",
    role: "",
    username: "",
    password: "",
    email: "",
    telephone: "",
    avatar_path: "#",
    birthday: new Date(),
    sex_boolean: true
  }
  submitted = false;
  show: any;
  birthday: NgbDateStruct;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  role = localStorage.getItem("role");


  constructor(
    private userService: UserService,
    private _location: Location,
    private uploadService: FileUploadService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.show = false;
  }

  saveUser(): void {
    const data = {
      faculty: this.user.faculty,
      role: this.user.role,
      username: this.user.username,
      password: this.user.password,
      email: this.user.email,
      telephone: this.user.telephone,
      avatar_path: this.currentFileUpload == undefined ? "#" : this.currentFileUpload.url,
      birthday: new Date(this.birthday.year,this.birthday.month-1,this.birthday.day+1).toISOString().substring(0, 10),
      sex_boolean: this.user.sex_boolean
    };
    console.log(data);

    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      faculty: "",
      role: "",
      username: "",
      password: "",
      email: "",
      telephone: "",
      avatar_path: "#",
      birthday: new Date(),
      sex_boolean: true
    };
  }

  backClicked() {
    this._location.back();
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
