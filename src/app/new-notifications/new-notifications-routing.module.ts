import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewNotificationsPage } from './new-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: NewNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewNotificationsPageRoutingModule {}
