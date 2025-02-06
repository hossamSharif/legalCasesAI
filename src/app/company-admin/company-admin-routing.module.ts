import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyAdminPage } from './company-admin.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyAdminPageRoutingModule {}
