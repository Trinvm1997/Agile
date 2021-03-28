import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://fgwmag.herokuapp.com/api/Home/Contribution';
@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }

  getByFaculty(title): Observable<any> {
    return this.http.get(`${baseUrl}?faculty=${title}`);
  }
}
