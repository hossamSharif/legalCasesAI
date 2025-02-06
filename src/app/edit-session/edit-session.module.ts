import {  NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { EditSessionPageRoutingModule } from './edit-session-routing.module'; 
import { EditSessionPage } from './edit-session.page';
import { ShareModuleModule } from '../shareModule/share-module.module';
import { FilesPageModule } from '../files/files.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    ShareModuleModule,
    EditSessionPageRoutingModule,
    FilesPageModule
  ],
  declarations: [EditSessionPage]
})
export class EditSessionPageModule {}
