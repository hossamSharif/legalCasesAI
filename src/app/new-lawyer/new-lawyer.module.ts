import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewLawyerPageRoutingModule } from './new-lawyer-routing.module';

import { NewLawyerPage } from './new-lawyer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewLawyerPageRoutingModule
  ],
  declarations: [NewLawyerPage]
})
export class NewLawyerPageModule {}
