import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
    isLoggedIn: string;
    url: string;
    tokenDetails: string;
  constructor(public auth: AuthService, public router: Router) {
    
    console.log('constructor')
  //this.isLoggedIn = sessionStorage.getItem('loginStatus');
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.url = state.url; 
    return this.checkLogin(this.url)
    
  }

  checkLogin(url) {
    this.tokenDetails = sessionStorage.getItem('token');
    console.log('loginssssss', this.tokenDetails)
    if (this.tokenDetails) {  
      console.log('success')    
      return true;  
    }
    else {
      console.log('login')
    this.router.navigate(['login']);
    return false;
   }
  }
}