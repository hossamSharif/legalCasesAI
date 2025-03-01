import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewExaminationsPageRoutingModule } from './new-examinations-routing.module';

import { NewExaminationsPage } from './new-examinations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewExaminationsPageRoutingModule
  ],
  declarations: [NewExaminationsPage]
})
export class NewExaminationsPageModule {}
