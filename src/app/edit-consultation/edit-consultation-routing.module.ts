import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditConsultationPage } from './edit-consultation.page';

const routes: Routes = [
  {
    path: '',
    component: EditConsultationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditConsultationPageRoutingModule {}
