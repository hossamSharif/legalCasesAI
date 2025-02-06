import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCasefilePage } from './edit-casefile.page';

const routes: Routes = [
  {
    path: '',
    component: EditCasefilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCasefilePageRoutingModule {}
