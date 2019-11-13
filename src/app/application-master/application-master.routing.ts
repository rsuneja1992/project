
import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from "@angular/router";
import { EquipmentComponent } from './equipment/equipment.component';
import { SparePartComponent } from './spare-part/spare-part.component';
import { StoresComponent } from './stores/stores.component';


export const routes:Routes = [
  {
    path: 'equipment',
    component: EquipmentComponent
  },
  {
    path: 'spare-part',
    component: SparePartComponent
  },
  {
    path: 'store',
    component: StoresComponent
  }
];

export const applicationMasterRouting = RouterModule.forChild(routes)
