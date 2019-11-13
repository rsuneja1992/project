import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators';
import { Config } from 'src/env.config';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  cpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }
  
  constructor(private  http: HttpClient) { }

  getAllEquipment() {
    return this.http.get(Config.BasePoint + 'equipmentMaster/getall').pipe(tap((data)=> {
      console.log('data', data)
      return data;
    },
    (error)=> {
      console.log('eroro', error)
    }))
  }
  

  createEquipment(data) {
    return this.http.post(Config.BasePoint + 'equipmentMaster/save', JSON.stringify(data), this.cpHeaders)
  }
}
