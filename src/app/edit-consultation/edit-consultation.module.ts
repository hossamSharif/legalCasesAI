import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditConsultationPageRoutingModule } from './edit-consultation-routing.module';

import { EditConsultationPage } from './edit-consultation.page';
import { FilesPageModule } from '../files/files.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditConsultationPageRoutingModule,
    FilesPageModule
  ],
  declarations: [EditConsultationPage]
})
export class EditConsultationPageModule {}
