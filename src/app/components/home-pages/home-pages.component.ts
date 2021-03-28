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


  constructor(
    private contributionService: ContributionService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private loginService: LoginService,
    private voteService: VoteService,
    private downloadService: DownloadService) { }

  ngOnInit(): void {
    this.retrieveContributions();
  }

  retrieveContributions(): void {
    this.contributionService.getAll()
      .subscribe(
        data => {
          this.contributions = data;
          this.contributions.filter(e => e.contribution_path.slice(-57,-56) == 'd')
          .forEach(e => {
            e.contribution_path = this.bypass("https://docs.google.com/gview?url="+e.contribution_path+"&embedded=true");
            console.log(e.contribution_path)
          });
          console.log(this.contributions);
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
  }
}
