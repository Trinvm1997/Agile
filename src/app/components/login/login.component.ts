import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login = {
    username: "",
    password: ""
  }
  role = localStorage.getItem("role");
  checked: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    if(localStorage.getItem("id") != undefined) this.router.navigate(["/home"]);
    else {
      localStorage.removeItem("id");
      localStorage.removeItem("faculty");
      localStorage.removeItem("role");
    }
    this.checked = false;
  }

  submit(): void {
    const data = {
      username: this.login.username,
      password: this.login.password
    }

    this.loginService.create(data)
      .subscribe(
        response => {
          console.log(response);
          if(this.checked == false) alert("Please agree on our Terms & Conditions !");
          else if(response["check"] == "false") alert("Your username or password is invalid !");
          else {
            localStorage.setItem("faculty",response.faculty);
            localStorage.setItem("role",response.role);
            localStorage.setItem("id",response.id);
            this.router.navigate(['/home']);
          }
        },
        error => {
          console.log(error);
        });
  }

  check() {
    this.checked = !this.checked;
    console.log(this.checked)
  }
}
