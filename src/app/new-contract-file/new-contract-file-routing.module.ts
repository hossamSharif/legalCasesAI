import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewContractFilePage } from './new-contract-file.page';

const routes: Routes = [
  {
    path: '',
    component: NewContractFilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewContractFilePageRoutingModule {}
