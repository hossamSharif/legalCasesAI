import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractServicesPage } from './contract-services.page';

const routes: Routes = [
  {
    path: '',
    component: ContractServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractServicesPageRoutingModule {}
