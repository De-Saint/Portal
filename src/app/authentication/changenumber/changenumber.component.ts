import { map } from 'rxjs/operators';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var jQuery: any;
@Component({
  selector: 'app-changenumber',
  templateUrl: './changenumber.component.html',
  styleUrls: ['./changenumber.component.sass']
})
export class ChangenumberComponent implements OnInit {
  changeForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  resp: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      code: [''],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.route.queryParams.subscribe(params => {
      this.resp = params;
    });
  }

  get f() {
    return this.changeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.changeForm.invalid) {
      return;
    } else {
      this.authService.confirmAccount(this.changeForm.value.code)
        .subscribe((resp => {
          if (resp.statusCode === 200) {
            this.authService.login(this.resp.email, this.resp.password)
              .subscribe(res => {
                if (res.statusCode === 200) {
                  this.router.navigate(['/dashboard/main']);
                }
              }, error => {
                this.showErrorMessage(error.error.description);
              });
          }
        }), error => {
          this.showErrorMessage(error.error.description);
        });

    }
  }

  onResend() {
    this.authService.requestPassword(this.resp.email)
      .subscribe(res => {
        if (res.statusCode === 200) {
          this.showErrorMessage(res.description);
        }
      }, error => {
        this.showErrorMessage(error.error.description);
      })
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
