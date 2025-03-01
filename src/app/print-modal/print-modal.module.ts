import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintModalPageRoutingModule } from './print-modal-routing.module';
import { QRCodeModule } from 'angularx-qrcode';
import { PrintModalPage } from './print-modal.page';
import { ShareModuleModule } from '../shareModule/share-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModuleModule,
    QRCodeModule,
    PrintModalPageRoutingModule
  ],
  declarations: [PrintModalPage]
})
export class PrintModalPageModule {}
