import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCasefilePage } from './new-casefile.page';

const routes: Routes = [
  {
    path: '',
    component: NewCasefilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCasefilePageRoutingModule {}
