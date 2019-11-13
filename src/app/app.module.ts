import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainLayoutModule} from "./main-layout/main-layout.module";
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {RouterModule} from "@angular/router";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import { UserFormComponent } from './administrator/user/user.component';
import { RoleFormComponent } from './administrator/role/role.component';
import { AccessPolicyFormComponent } from './administrator/access-policy/access-policy.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './services/token-interceptor';
import { EquipmentFormComponent } from './application-master/equipment/equipment.component';
import { WaitingDialogComponent } from './modals/waiting-dialog/waiting-dialog.component';
import { SuccessDialogComponent } from './modals/success-dialog/success-dialog.component';

@NgModule({
  declarations: [
    AppComponent, WaitingDialogComponent, SuccessDialogComponent, MainLayoutComponent ,EquipmentFormComponent, UserFormComponent, RoleFormComponent, AccessPolicyFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, RouterModule, MDBBootstrapModule.forRoot(), HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [AuthGuardService, AuthService, JwtHelperService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
}],
  bootstrap: [AppComponent],
  entryComponents:[SuccessDialogComponent, WaitingDialogComponent, UserFormComponent, RoleFormComponent, AccessPolicyFormComponent, EquipmentFormComponent]
})
export class AppModule { }
