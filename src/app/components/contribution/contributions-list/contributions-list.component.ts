import { Component, OnInit } from '@angular/core';
import { Contribution } from 'src/app/models/contribution.model';
import { ContributionService } from 'src/app/services/contribution.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-contributions-list',
  templateUrl: './contributions-list.component.html',
  styleUrls: ['./contributions-list.component.css']
})
export class ContributionsListComponent implements OnInit {
  contributions?: Contribution[];
  currentContribution?: Contribution;
  currentIndex = -1;
  title = '';
  faculty = localStorage.getItem("faculty");
  check = this.faculty == "1";
  role = localStorage.getItem("role");



  constructor(
    private contributionService: ContributionService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    if(this.check) this.retrieveContributions();
    else this.getByFaculty();
  }

  retrieveContributions(): void {
    this.contributionService.getAll()
      .subscribe(
        data => {
          this.contributions = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveContributions();
    this.currentContribution = undefined;
    this.currentIndex = -1;
  }

  setActiveContribution(contribution: Contribution, index: number): void {
    this.currentContribution = contribution;
    this.currentIndex = index;
  }

  removeAllContributions(): void {
    this.contributionService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchContribution(): void {
    this.contributionService.findByName(this.title)
      .subscribe(
        data => {
          this.contributions = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getByFaculty() : void {
    this.contributionService.getByFaculty(this.faculty)
    .subscribe(
      data => {
        this.contributions = data;
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
