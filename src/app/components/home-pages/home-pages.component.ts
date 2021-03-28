import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Contribution } from 'src/app/models/contribution.model';
import { ContributionService } from 'src/app/services/contribution.service';

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
    private loginService: LoginService) { }

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
}
