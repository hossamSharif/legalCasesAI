import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCasefilePageRoutingModule } from './edit-casefile-routing.module';

import { EditCasefilePage } from './edit-casefile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditCasefilePageRoutingModule
  ],
  declarations: [EditCasefilePage]
})
export class EditCasefilePageModule {}
