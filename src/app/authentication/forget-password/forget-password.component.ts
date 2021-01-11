import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { AuthenticationService } from '../service/authentication.service';
declare var jQuery: any;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.sass']
})
export class ForgetPasswordComponent implements OnInit {
  forgetpasswordForm: FormGroup;
  submitted = false;
  returnUrl: string;
  respData: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
  ) {}
  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onSubmit(form: NgForm) {
    this.authService.requestPassword(form.value.email).subscribe((resp =>{
      this.respData = resp;
      if (this.respData.statusCode === 200) {
        this.router.navigate(["/authentication/validation"]);
      }
    }),error =>{
      jQuery('.message-alert').removeClass('d-none');
      jQuery('.message-alert').addClass('alert alert-danger');
      jQuery('.message-alert').html(error.error.description).fadeIn(900);
      jQuery(".message-alert").fadeTo(2000, 500).slideUp(500, function () {
        jQuery(".message-alert").slideUp(500);
      });

    });
  }
}
