import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNotificationsPageRoutingModule } from './edit-notifications-routing.module';

import { EditNotificationsPage } from './edit-notifications.page';
import { ShareModuleModule } from '../shareModule/share-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShareModuleModule,
    IonicModule,
    EditNotificationsPageRoutingModule
  ],
  declarations: [EditNotificationsPage]
})
export class EditNotificationsPageModule {}
