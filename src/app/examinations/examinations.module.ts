import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExaminationsPageRoutingModule } from './examinations-routing.module';

import { ExaminationsPage } from './examinations.page';
import { ShareModuleModule } from '../shareModule/share-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModuleModule,
    ExaminationsPageRoutingModule
  ],
  declarations: [ExaminationsPage]
})
export class ExaminationsPageModule {}
