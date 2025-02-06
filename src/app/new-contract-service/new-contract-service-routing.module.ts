import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewContractServicePage } from './new-contract-service.page';

const routes: Routes = [
  {
    path: '',
    component: NewContractServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewContractServicePageRoutingModule {}
