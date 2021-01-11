import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var jQuery: any;
@Component({
  selector: 'app-validationpage',
  templateUrl: './validationpage.component.html',
  styleUrls: ['./validationpage.component.sass']
})
export class ValidationpageComponent implements OnInit {
  valForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  respData: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }
  ngOnInit() {
    this.valForm = this.formBuilder.group({
      code: [''],
      password: [''],
      cpassword: ['']
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.valForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.valForm.invalid) {
      return;
    } else {
      if (this.valForm.value.password === this.valForm.value.cpassword) {
        this.authService.resetPassword(this.valForm.value.code, this.valForm.value.password)
          .subscribe((resp => {
            this.respData = resp;
            if (this.respData.statusCode === 200) {
              this.authService.login(resp.data.email, this.valForm.value.password)
                .subscribe(res => {
                  this.respData = res;
                  if (this.respData.statusCode === 200) {
                    this.router.navigate(['/dashboard/main']);
                  }
                }, error => {
                  this.showErrorMessage(error.error.description);
                });
            }
          }), error => {
            this.showErrorMessage(error.error.description);
          });
      } else {
        this.showErrorMessage("Password Mismatch");
      }
    }
  }

  showErrorMessage(message) {
    jQuery('.message-alert').removeClass('d-none');
    jQuery('.message-alert').addClass('alert alert-danger');
    jQuery('.message-alert').html(message).fadeIn(900);
    jQuery(".message-alert").fadeTo(2000, 500).slideUp(500, function () {
      jQuery(".message-alert").slideUp(500);
    });
  }
}
