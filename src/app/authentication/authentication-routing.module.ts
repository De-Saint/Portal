import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MemberregistrationComponent } from './memberregistration/memberregistration.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ValidationpageComponent } from './validationpage/validationpage.component';
import { ChangenumberComponent } from './changenumber/changenumber.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'memberregistration',
    component: MemberregistrationComponent
  },
  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent
  },
  {
    path: 'validation',
    component: ValidationpageComponent
  },
  {
    path: 'changenumber',
    component: ChangenumberComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
