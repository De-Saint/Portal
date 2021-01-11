import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DependantsComponent } from '../dependant/dependants/dependants.component';

const routes: Routes = [
    { 
      path: 'dependants', 
      component:DependantsComponent
     }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DependantRoutingModule { }