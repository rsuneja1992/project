import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/env.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(article): Observable<any> {
    console.log('ser')
     return this.http.post(Config.BasePoint + 'api/auth/signin', article);
} 
}
