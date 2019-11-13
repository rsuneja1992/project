
import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from "@angular/router";
import {UserComponent} from "./user/user.component";
import {RoleComponent} from "./role/role.component";
import {AccessPolicyComponent} from "./access-policy/access-policy.component";


export const routes:Routes = [
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'role',
    component: RoleComponent
  },
  {
    path: 'access-policy',
    component: AccessPolicyComponent
  }
];

export const adminRouting = RouterModule.forChild(routes)
