import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-contribution-details',
  templateUrl: './contribution-details.component.html',
  styleUrls: ['./contribution-details.component.css']
})
export class ContributionDetailsComponent implements OnInit {
  role = localStorage.getItem("role");


  constructor(private loginService: LoginService) { }
  

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
  }
}
