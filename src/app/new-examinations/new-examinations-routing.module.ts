import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewExaminationsPage } from './new-examinations.page';

const routes: Routes = [
  {
    path: '',
    component: NewExaminationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewExaminationsPageRoutingModule {}
