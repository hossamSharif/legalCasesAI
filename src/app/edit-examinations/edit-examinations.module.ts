import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditExaminationsPageRoutingModule } from './edit-examinations-routing.module';

import { EditExaminationsPage } from './edit-examinations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditExaminationsPageRoutingModule
  ],
  declarations: [EditExaminationsPage]
})
export class EditExaminationsPageModule {}
