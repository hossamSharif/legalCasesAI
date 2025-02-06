import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractFilesPage } from './contract-files.page';

const routes: Routes = [
  {
    path: '',
    component: ContractFilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractFilesPageRoutingModule {}
