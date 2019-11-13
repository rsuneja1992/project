import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {tap} from 'rxjs/internal/operators';
import { Config } from 'src/env.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AccessPolicyService {
  cpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }
  
  constructor(private  http: HttpClient) { }

  getAllAccessPolicy() {
    return this.http.get(Config.BasePoint + 'accessPolicy/getall').pipe(tap((data)=> {
      console.log('data', data)
      return data;
    },
    (error)=> {
      console.log('eroro', error)
    }))
  }

  createAccessPolicy(data) {
    return this.http.post(Config.BasePoint + 'accessPolicy/add', JSON.stringify(data), this.cpHeaders)
  }
}
