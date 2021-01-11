import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteGuard } from './shared/services/route-guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule), canActivate: [RouteGuard]
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule), canActivate: [RouteGuard]
  },
  {
    path: 'dependant',
    loadChildren: () =>
      import('./dependant/dependant.module').then((m) => m.DependantModule), canActivate: [RouteGuard]
  },
  {
    path: 'warrant',
    loadChildren: () =>
      import('./warrant/warrant.module').then((m) => m.WarrantsModule), canActivate: [RouteGuard]
  },
  {
    path: 'organization',
    loadChildren: () =>
      import('./organization/organization.module').then((m) => m.OrganizationModule), canActivate: [RouteGuard]
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then((m) => m.AuthenticationModule
      ),
  },
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
