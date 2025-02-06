import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewContractServicePageRoutingModule } from './new-contract-service-routing.module';

import { NewContractServicePage } from './new-contract-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewContractServicePageRoutingModule
  ],
  declarations: [NewContractServicePage]
})
export class NewContractServicePageModule {}
