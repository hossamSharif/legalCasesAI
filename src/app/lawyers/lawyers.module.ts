import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LawyersPageRoutingModule } from './lawyers-routing.module';

import { LawyersPage } from './lawyers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LawyersPageRoutingModule
  ],
  declarations: [LawyersPage]
})
export class LawyersPageModule {}
