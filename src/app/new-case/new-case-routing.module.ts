import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCasePage } from './new-case.page';

const routes: Routes = [
  {
    path: '',
    component: NewCasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCasePageRoutingModule {}
