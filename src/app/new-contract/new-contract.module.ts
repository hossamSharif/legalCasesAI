import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewContractPageRoutingModule } from './new-contract-routing.module';

import { NewContractPage } from './new-contract.page';
import { ContractFilesPageModule } from '../contract-files/contract-files.module';
import { ContractServicesPageModule } from '../contract-services/contract-services.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NewContractPageRoutingModule ,
    ContractFilesPageModule ,
    ContractServicesPageModule
  ],
  declarations: [NewContractPage]
})
export class NewContractPageModule {}
