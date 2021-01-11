import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationsComponent } from '../organization/organizations/organizations.component';

const routes: Routes = [
    { 
      path: 'organizations', 
      component:OrganizationsComponent
     }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OrganizationRoutingModule { }