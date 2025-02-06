import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCourtPageRoutingModule } from './new-court-routing.module';

import { NewCourtPage } from './new-court.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCourtPageRoutingModule
  ],
  declarations: [NewCourtPage]
})
export class NewCourtPageModule {}
