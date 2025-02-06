import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractFilesPageRoutingModule } from './contract-files-routing.module';

import { ContractFilesPage } from './contract-files.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractFilesPageRoutingModule
  ],
  exports: [ContractFilesPage],
  declarations: [ContractFilesPage]
})
export class ContractFilesPageModule {}
