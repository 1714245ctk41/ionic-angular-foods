import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThanhtoanPageRoutingModule } from './thanhtoan-routing.module';

import { ThanhtoanPage } from './thanhtoan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThanhtoanPageRoutingModule
  ],
  declarations: [ThanhtoanPage]
})
export class ThanhtoanPageModule {}
