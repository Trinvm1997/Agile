import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contribution } from 'src/app/models/contribution.model';
import { ContributionService } from 'src/app/services/contribution.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-contribution-details',
  templateUrl: './contribution-details.component.html',
  styleUrls: ['./contribution-details.component.css']
})
export class ContributionDetailsComponent implements OnInit {
  role = localStorage.getItem("role");
  currentContribution: Contribution = {
    title: "",
    note: "",
    contribution_path: "",
    upload_time: "2021-03-28T07:57:40.305872Z",
    vote: 0,
    check_selected: false,
    comment: null,
    user: 7,
    faculty: 3,
    filetype: 1
  };
  message = '';


  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private contributionService: ContributionService
    ) { }
  

  ngOnInit(): void {
    this.message = "";
    this.getContribution(this.route.snapshot.params.id);

  }

  getContribution(id: number): void {
    this.contributionService.get(id)
      .subscribe(
        data => {
          this.currentContribution = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateContribution(): void {
    this.contributionService.update(this.currentContribution.id, this.currentContribution)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  check() {
    this.currentContribution.check_selected = !this.currentContribution.check_selected;
  }

  logout() {
    this.loginService.logout();
  }
}
