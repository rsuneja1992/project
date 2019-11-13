import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent, EquipmentFormComponent } from './equipment/equipment.component';
import { SparePartComponent } from './spare-part/spare-part.component';
import { StoresComponent } from './stores/stores.component';
import { applicationMasterRouting } from './application-master.routing';
import { FormsModule } from '@angular/forms';
import { ModalModule, WavesModule, IconsModule, TableModule, ButtonsModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [EquipmentComponent, SparePartComponent, StoresComponent],
  imports: [
    CommonModule, applicationMasterRouting, FormsModule, 
    ModalModule,WavesModule, IconsModule, TableModule, ButtonsModule
  ],
  entryComponents: []
})
export class ApplicationMasterModule { }
