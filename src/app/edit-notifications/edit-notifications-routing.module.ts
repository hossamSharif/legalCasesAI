import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNotificationsPage } from './edit-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: EditNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNotificationsPageRoutingModule {}
