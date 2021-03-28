import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://fgwmag.herokuapp.com/api/Home/Download';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }

  download(): Observable<any> {
    return this.http.get(`${baseUrl}`);
  }
}
