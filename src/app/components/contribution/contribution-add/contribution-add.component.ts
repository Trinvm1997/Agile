import { Component, OnInit } from '@angular/core';
import { Contribution } from 'src/app/models/contribution.model';
import { FileUpload } from 'src/app/models/file.model';
import { ContributionService } from 'src/app/services/contribution.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-contribution-add',
  templateUrl: './contribution-add.component.html',
  styleUrls: ['./contribution-add.component.css']
})
export class ContributionAddComponent implements OnInit {
  contribution: Contribution = {
    user: "",
    faculty: "",
    file_type: "1",
    title: "", 
    note: "",
    contribution_path: "",
    upload_time: new Date(),
    vote: 0,
    check_selected: false
  }
  role = localStorage.getItem("role");
  submitted = false;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  constructor(
    private contributionService: ContributionService,
    private _location: Location,
    private uploadService: FileUploadService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    
  }

  saveContribution(): void {
    const data = {
      user: localStorage.getItem("id"),
      faculty: localStorage.getItem("faculty"),
      filetype: 1,
      title: this.contribution.title, 
      note: this.currentFileUpload.name.replace(/ /g,""),
      contribution_path: this.currentFileUpload.url,
      upload_time: new Date(),
      vote: 0,
      check_selected: false
    };
    console.log(data);

    this.contributionService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newContribution(): void {
    this.submitted = false;
    this.contribution = {
      user: "",
      faculty: "",
      file_type: "1",
      title: "", 
      note: "",
      contribution_path: "",
      upload_time: new Date(),
      vote: 0,
      check_selected: false
    };
    this.percentage = 0;
  }

  backClicked() {
    this._location.back();
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorageContribution(this.currentFileUpload).subscribe(
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
