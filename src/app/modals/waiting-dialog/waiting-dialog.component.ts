import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-waiting-dialog',
  templateUrl: './waiting-dialog.component.html',
  styleUrls: ['./waiting-dialog.component.scss']
})
export class WaitingDialogComponent implements OnInit {
 message: string;
  constructor(public modalRef: MDBModalRef) { 
    
  }

  ngOnInit() {
  }

}
