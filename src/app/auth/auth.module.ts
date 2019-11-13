import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent, AboutUsComponent],
  imports: [
    CommonModule, HttpClientModule , FormsModule , BrowserModule, ReactiveFormsModule
  ]
})
export class AuthModule { }
