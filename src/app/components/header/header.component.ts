import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  role = localStorage.getItem("role");

  constructor(private loginService: LoginService) {
    this.loginService.user.subscribe(x => {
      this.user = x;
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
}
}
