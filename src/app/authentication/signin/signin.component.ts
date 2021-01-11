import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {AuthenticationService } from '../service/authentication.service';
declare var jQuery:any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  respData: any;
  error: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.login(this.f.email.value, this.f.password.value)
        .subscribe(resp => {
          this.respData = resp;
          if (this.respData.statusCode === 200) {
            this.router.navigate(['/dashboard/main']);
          }else{
            this.error = this.respData.description;
            jQuery('.message-alert').removeClass('d-none');
            jQuery('.message-alert').addClass('alert alert-danger');
            jQuery('.message-alert').html( this.error).fadeIn(900);
            jQuery(".message-alert").fadeTo(2000, 500).slideUp(500, function () {
              jQuery(".message-alert").slideUp(500);
            });
          }
        }, error => {
          this.error = error;
        });
    }
  }
}
