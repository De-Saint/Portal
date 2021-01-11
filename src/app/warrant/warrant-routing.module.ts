import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarrantsComponent } from './warrants/warrants.component';

const routes: Routes = [
   { 
    path: 'warrants', 
    component: WarrantsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarrantRoutingModule { }