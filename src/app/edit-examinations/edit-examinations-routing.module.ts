import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditExaminationsPage } from './edit-examinations.page';

const routes: Routes = [
  {
    path: '',
    component: EditExaminationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditExaminationsPageRoutingModule {}
