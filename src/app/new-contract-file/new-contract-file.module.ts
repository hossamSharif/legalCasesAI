import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewContractFilePageRoutingModule } from './new-contract-file-routing.module';

import { NewContractFilePage } from './new-contract-file.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule , 
    
    IonicModule,
    NewContractFilePageRoutingModule
  ],
  declarations: [NewContractFilePage]
})
export class NewContractFilePageModule {}
