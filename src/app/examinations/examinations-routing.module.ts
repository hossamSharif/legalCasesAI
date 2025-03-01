import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExaminationsPage } from './examinations.page';

const routes: Routes = [
  {
    path: '',
    component: ExaminationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationsPageRoutingModule {}
