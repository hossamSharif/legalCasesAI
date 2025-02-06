import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractServicesPageRoutingModule } from './contract-services-routing.module';

import { ContractServicesPage } from './contract-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractServicesPageRoutingModule
  ],
  exports: [ContractServicesPage],
  declarations: [ContractServicesPage]
})
export class ContractServicesPageModule {}
