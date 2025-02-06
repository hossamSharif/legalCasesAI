import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCasefilePageRoutingModule } from './new-casefile-routing.module';

import { NewCasefilePage } from './new-casefile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewCasefilePageRoutingModule
  ],
  declarations: [NewCasefilePage]
})
export class NewCasefilePageModule {}
