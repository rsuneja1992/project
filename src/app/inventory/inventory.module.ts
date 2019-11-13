import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentInventoryComponent } from './equipment-inventory/equipment-inventory.component';
import { SpareInventoryComponent } from './spare-inventory/spare-inventory.component';



@NgModule({
  declarations: [EquipmentInventoryComponent, SpareInventoryComponent],
  imports: [
    CommonModule
  ]
})
export class InventoryModule { }
