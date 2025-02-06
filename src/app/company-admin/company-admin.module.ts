import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyAdminPageRoutingModule } from './company-admin-routing.module';

import { CompanyAdminPage } from './company-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyAdminPageRoutingModule
  ],
  declarations: [CompanyAdminPage]
})
export class CompanyAdminPageModule {}
