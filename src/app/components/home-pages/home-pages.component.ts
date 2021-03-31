import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Contribution } from 'src/app/models/contribution.model';
import { ContributionService } from 'src/app/services/contribution.service';
import { VoteService } from 'src/app/services/vote.service';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-home-pages',
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.css']
})
export class HomePagesComponent implements OnInit {
  contributions?: Contribution[];
  role = localStorage.getItem("role");
  id = localStorage.getItem("id");
  deadline: any;


  constructor(
    private contributionService: ContributionService,
    private sanitizer: DomSanitizer,
    private loginService: LoginService,
    private voteService: VoteService,
    private downloadService: DownloadService) { }

  ngOnInit(): void {
    this.retrieveContributions();
    this.deadline = [new Date(2021,2,28),new Date(2021,7,31),new Date(2021,11,31)];
    // if(this.deadline[0] < new Date(Date.now())){
    //   this.deadline.shift();
    //   this.deadline.push(new Date(this.deadline[1].setDate(this.deadline[1].getDate() + 121)));
    // }
  }

  retrieveContributions(): void {
    if(localStorage.getItem("faculty") == "2") {
      this.contributionService.getByFaculty(2)
      .subscribe(
        data => {
          this.contributions = data;
          this.contributions.filter(e => e.contribution_path.slice(-57,-56) == 'd')
          .forEach(e => {
            e.contribution_path = this.bypass("https://docs.google.com/gview?url="+e.contribution_path+"&embedded=true");
          });
          console.log(this.contributions);
          let user = (this.groupBy(this.contributions.filter(e => e.faculty == 2),e => e.user));
          let userCon = user.get(parseInt(this.id));
          console.log(userCon)
          for(let i = 0; i < userCon.length; i++){
            if(new Date(userCon[i].upload_time) > this.deadline[0]) {
              if(userCon[i].comment == null){
                alert("You have uncomment contribution !!!");
                break;
              }
            }
          }
        },
        error => {
          console.log(error);
        });
    }
    else if(localStorage.getItem("faculty") == "3"){
      this.contributionService.getByFaculty(3)
      .subscribe(
        data => {
          this.contributions = data;
          this.contributions.filter(e => e.contribution_path.slice(-57,-56) == 'd')
          .forEach(e => {
            e.contribution_path = this.bypass("https://docs.google.com/gview?url="+e.contribution_path+"&embedded=true");
          });
          console.log(this.contributions);
          let user = (this.groupBy(this.contributions.filter(e => e.faculty == 3),e => e.user));
          let userCon = user.get(parseInt(this.id));
          console.log(userCon)
          for(let i = 0; i < userCon.length; i++){
            if(new Date(userCon[i].upload_time) > this.deadline[0]) {
              if(userCon[i].comment == null){
                alert("You have uncomment contribution !!!");
                break;
              }
            }
          }
        },
        error => {
          console.log(error);
        });
    }
    else if(localStorage.getItem("faculty") == "4"){
      this.contributionService.getByFaculty(4)
      .subscribe(
        data => {
          this.contributions = data;
          this.contributions.filter(e => e.contribution_path.slice(-57,-56) == 'd')
          .forEach(e => {
            e.contribution_path = this.bypass("https://docs.google.com/gview?url="+e.contribution_path+"&embedded=true");
          });
          console.log(this.contributions);
          let user = (this.groupBy(this.contributions.filter(e => e.faculty == 4),e => e.user));
          let userCon = user.get(parseInt(this.id));
          console.log(userCon)
          for(let i = 0; i < userCon.length; i++){
            if(new Date(userCon[i].upload_time) > this.deadline[0]) {
              if(userCon[i].comment == null){
                alert("You have uncomment contribution !!!");
                break;
              }
            }
          }
        },
        error => {
          console.log(error);
        });
    }
    else this.contributionService.getAll()
      .subscribe(
        data => {
          this.contributions = data;
          this.contributions.filter(e => e.contribution_path.slice(-57,-56) == 'd')
          .forEach(e => {
            e.contribution_path = this.bypass("https://docs.google.com/gview?url="+e.contribution_path+"&embedded=true");
          });
          console.log(this.contributions);
          let user = (this.groupBy(this.contributions,e => e.user));
          let userCon = user.get(parseInt(this.id));
          console.log(userCon)
          for(let i = 0; i < userCon.length; i++){
            if(new Date(userCon[i].upload_time) > this.deadline[0]) {
              if(userCon[i].comment == null){
                alert("You have uncomment contribution !!!");
                break;
              }
            }
          }
        },
        error => {
          console.log(error);
        });
  }

  logout() {
    this.loginService.logout();
  }

  bypass(e) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(e)
  }

  typecheck(e) {
    return typeof(e) == "string";
  }

  upvote(id) {
    this.voteService.upvote(id)
    .subscribe(res => {
      console.log(res);
    });
  }

  downvote(id) {
    this.voteService.downvote(id)
    .subscribe(res => {
      console.log(res);
    });
  }

  download() {
    this.downloadService.download()
    .subscribe(res => {
      console.log(res);
    });

    this.downloadService.downloadViaUrl();
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
  }
}
