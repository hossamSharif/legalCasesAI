import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCaseStatusPageRoutingModule } from './new-case-status-routing.module';

import { NewCaseStatusPage } from './new-case-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCaseStatusPageRoutingModule
  ],
  declarations: [NewCaseStatusPage]
})
export class NewCaseStatusPageModule {}
