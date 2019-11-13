import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators';
import { Config } from 'src/env.config';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  cpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }
  
  constructor(private  http: HttpClient) { }

  getAllRoles() {
    return this.http.get(Config.BasePoint + 'role/getall').pipe(tap((data)=> {
      console.log('data', data)
      return data;
    },
    (error)=> {
      console.log('eroro', error)
    }))
  }
  

  createRole(data) {
    return this.http.post(Config.BasePoint + 'role/save', JSON.stringify(data), this.cpHeaders)
  }
}
