import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaseStatusPageRoutingModule } from './case-status-routing.module';

import { CaseStatusPage } from './case-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaseStatusPageRoutingModule
  ],
  declarations: [CaseStatusPage]
})
export class CaseStatusPageModule {}
