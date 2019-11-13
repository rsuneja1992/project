import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent, UserFormComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { AccessPolicyComponent } from './access-policy/access-policy.component';
import {adminRouting} from "./administrator.routing";
import {ButtonsModule, WavesModule, IconsModule, TableModule, ModalModule} from "angular-bootstrap-md";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserComponent, RoleComponent, AccessPolicyComponent],
  imports: [
    CommonModule, adminRouting, ButtonsModule, FormsModule, ModalModule,WavesModule, IconsModule, TableModule
  ],
  entryComponents: [],
  exports: []
})
export class AdministratorModule { }
