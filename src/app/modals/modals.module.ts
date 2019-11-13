import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingDialogComponent } from './waiting-dialog/waiting-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';



@NgModule({
  declarations: [ConfirmDialogComponent, ErrorDialogComponent],
  imports: [
    CommonModule
  ],
  entryComponents: []
})
export class ModalsModule { }
