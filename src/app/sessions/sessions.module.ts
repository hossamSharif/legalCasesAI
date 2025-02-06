import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionsPageRoutingModule } from './sessions-routing.module';

import { SessionsPage } from './sessions.page';
import { ShareModuleModule } from '../shareModule/share-module.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModuleModule, 
    SessionsPageRoutingModule
  ],
  exports:[SessionsPage] ,
  declarations: [SessionsPage]
})
export class SessionsPageModule {}
