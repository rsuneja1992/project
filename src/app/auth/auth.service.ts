import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
    jwtHelper: any;
    tokenDetails: any;
  constructor() {
    this.jwtHelper = new JwtHelperService();
  }
  // ...
  public isAuthenticated(): boolean {
    this.tokenDetails = sessionStorage.getItem('token');
    console.log('jwt', this.jwtHelper.isTokenExpired(this.tokenDetails))
    // Check whether the token is expired and return
    // true or false
    return this.jwtHelper.isTokenExpired(this.tokenDetails);
  }
}