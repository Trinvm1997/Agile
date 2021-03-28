import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const baseUrl = 'https://fgwmag.herokuapp.com/api/Home/Signin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router) {}

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('faculty');
    this.router.navigate(['/login']);
  }
}
