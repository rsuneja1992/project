import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClientModule, HttpClient } from '@angular/common/http';
import { Config } from 'src/env.config';
import { Observable } from "rxjs";
import {tap} from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
cpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
}
  constructor(private  http: HttpClient) { }

    getAllUsers() {
      return this.http.get(Config.BasePoint + 'api/auth/getall').pipe(tap((data)=> {
        console.log('data', data)
        return data;
      },
      (error)=> {
        console.log('eroro', error)
      }))
    }
    

    createUser(data) {
      return this.http.post(Config.BasePoint + 'api/auth/signup', JSON.stringify(data), this.cpHeaders)
    }
}
