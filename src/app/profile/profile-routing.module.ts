import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydetailsComponent } from './mydetails/mydetails.component';
import { MycontactsComponent } from './mycontacts/mycontacts.component';
import { MypermissionsComponent } from './mypermissions/mypermissions.component';

const routes: Routes = [
  { 
    path: 'mydetails', 
    component: MydetailsComponent
   },
  { 
    path: 'mycontacts', 
    component: MycontactsComponent
   },
   { 
    path: 'mypermissions', 
    component: MypermissionsComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
