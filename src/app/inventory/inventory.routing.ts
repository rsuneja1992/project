
import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from "@angular/router";
import { EquipmentInventoryComponent } from './equipment-inventory/equipment-inventory.component';
import { SpareInventoryComponent } from './spare-inventory/spare-inventory.component';


export const routes:Routes = [
  {
    path: 'equipment',
    component: EquipmentInventoryComponent
  },
  {
    path: 'spare-part',
    component: SpareInventoryComponent
  },
  
];

export const inventoryRouting = RouterModule.forChild(routes)
