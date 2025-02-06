import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSessionPageRoutingModule } from './new-session-routing.module';
import { FilesPageModule } from '../files/files.module';
import { NewSessionPage } from './new-session.page';
import { ShareModuleModule } from '../shareModule/share-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShareModuleModule,
    NewSessionPageRoutingModule,
    FilesPageModule
  ],
  declarations: [NewSessionPage]
})
export class NewSessionPageModule {}
