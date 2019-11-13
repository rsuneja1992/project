import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {LoginComponent} from "./auth/login/login.component";
import { AuthGuardService } from './auth/auth-guard.service';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: {pageTitle: 'Home'},
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        data: {pageTitle: 'Dashboard'}
      },
      {
        path: 'masters',
        loadChildren: './application-master/application-master.module#ApplicationMasterModule',
        data: {pageTitle: 'Masters'}
      },
      {
        path: 'admin',
        loadChildren: './administrator/administrator.module#AdministratorModule',
        data: {pageTitle: 'Masters'}
      },
      {
        path: 'inventory',
        loadChildren: './inventory/inventory.module#InventoryModule',
        data: {pageTitle: 'Dashboard'}
      },
      {
        path: 'sr',
        loadChildren: './service-request/service-request.module#ServiceRequestModule',
        data: {pageTitle: 'Dashboard'}
      },
    ]
  },{
    path:'login',
    component:LoginComponent,
    pathMatch: 'full'

  }

  ]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true}), FormsModule],
  declarations: [LoginComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
