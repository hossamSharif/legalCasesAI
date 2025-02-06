import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCaseStatusPage } from './new-case-status.page';

const routes: Routes = [
  {
    path: '',
    component: NewCaseStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCaseStatusPageRoutingModule {}
