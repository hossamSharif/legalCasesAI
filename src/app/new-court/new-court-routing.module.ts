import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCourtPage } from './new-court.page';

const routes: Routes = [
  {
    path: '',
    component: NewCourtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCourtPageRoutingModule {}
