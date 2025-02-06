import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LawyersPage } from './lawyers.page';

const routes: Routes = [
  {
    path: '',
    component: LawyersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LawyersPageRoutingModule {}
