import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCasePageRoutingModule } from './edit-case-routing.module';

import { EditCasePage } from './edit-case.page';
import { FilesPageModule } from '../files/files.module';
import { SessionsPageModule } from '../sessions/sessions.module';
import { ShareModuleModule } from '../shareModule/share-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    ShareModuleModule,
    EditCasePageRoutingModule ,
    FilesPageModule,
    
    SessionsPageModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EditCasePage]
})
export class EditCasePageModule {}
