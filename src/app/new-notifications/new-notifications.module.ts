import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewNotificationsPageRoutingModule } from './new-notifications-routing.module';

import { NewNotificationsPage } from './new-notifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewNotificationsPageRoutingModule
  ],
  declarations: [NewNotificationsPage]
})
export class NewNotificationsPageModule {}
