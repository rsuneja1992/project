import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { loginAttributes } from './login';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { WaitingDialogComponent } from 'src/app/modals/waiting-dialog/waiting-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userDetails: loginAttributes = new loginAttributes()
  waitingModalRef: MDBModalRef;
  constructor(private modalService: MDBModalService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.waitingModalRef = this.modalService.show(WaitingDialogComponent, {
      data: {
        message: 'Logging In'
      }
    })
    this.loginService.login(this.userDetails).subscribe((data) => {
      sessionStorage.setItem('token', data.accessToken);
      //sessionStorage.setItem('loginStatus', "true");
      this.router.navigate(['/admin/user'])
      this.waitingModalRef.hide()
      console.log('data', data)
      
      
      
    })
  }

}
