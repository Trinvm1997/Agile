import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://fgwmag.herokuapp.com/api/Home';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  upvote(id): Observable<any> {
    return this.http.post(`${baseUrl}/UpVote/${id}`,"");
  }

  downvote(id): Observable<any> {
    return this.http.post(`${baseUrl}/DownVote/${id}`,"");
  }
}
