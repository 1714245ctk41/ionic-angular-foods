import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThanhtoanPage } from './thanhtoan.page';

const routes: Routes = [
  {
    path: '',
    component: ThanhtoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThanhtoanPageRoutingModule {}
