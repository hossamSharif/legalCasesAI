import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewConsultationPageRoutingModule } from './new-consultation-routing.module';
import { FilterPipe } from "./pipe";
import { FilterPipe2 } from "./pipe2";
import { FilterPipe3 } from "./pipe3";
import { NewConsultationPage } from './new-consultation.page'; 
import { FilesPageModule } from '../files/files.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewConsultationPageRoutingModule,
    FilesPageModule
  ],
  declarations: [NewConsultationPage
  ] ,
exports: [
]
})
export class NewConsultationPageModule {}
