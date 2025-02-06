import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewLawyerPage } from './new-lawyer.page';

const routes: Routes = [
  {
    path: '',
    component: NewLawyerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewLawyerPageRoutingModule {}
