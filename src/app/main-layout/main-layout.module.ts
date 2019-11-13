import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import {RouterModule} from "@angular/router";
import {IconsModule} from "angular-bootstrap-md";



@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule, RouterModule, IconsModule
  ],
  exports: [MainLayoutComponent]
})
export class MainLayoutModule { }
