import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FilterPipe } from "./pipe";
import { FilterPipe2 } from "./pipe2";
import { FilterPipe3 } from "./pipe3";
import { NewCasePageRoutingModule } from './new-case-routing.module';

import { NewCasePage } from './new-case.page';
import { FilesPageModule } from '../files/files.module';
import { SessionsPageModule } from '../sessions/sessions.module';
import { ShareModuleModule } from '../shareModule/share-module.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewCasePageRoutingModule,
    FilesPageModule,
    ShareModuleModule,
    SessionsPageModule
  ],
  declarations:
   [NewCasePage
  ] ,
exports: [
 
]
})
export class NewCasePageModule {}
