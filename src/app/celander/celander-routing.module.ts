import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CelanderPage } from './celander.page';

const routes: Routes = [
  {
    path: '',
    component: CelanderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CelanderPageRoutingModule {}
