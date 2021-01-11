import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { ProfileService, Request } from '../services/profile.service';
declare var jQuery: any;

@Component({
  selector: 'app-mydetails',
  templateUrl: './mydetails.component.html',
  styleUrls: ['./mydetails.component.sass']
})
export class MydetailsComponent implements OnInit {
  showSpinner = true;
  profForm: FormGroup;
  submitted = false;
  respData: any;
  hide = true;
  updatePasswordForm: FormGroup;
  //GET USER BY ID
  userResult: any;
  userData: any;
  id: any;

  // CHANGE REQUEST
  userChangeResult: any;
  userChangeData: any;

  //GET USER TYPE
  userType: any;

  // ERROR RESPONSE
  errorResp: any;
  req: Request = new Request("", "", "");

  constructor(
    public profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.profForm = this.formBuilder.group({
      new_details: [''],
      password: [''],
      subject: ['']
    });
    this.updatePasswordForm = this.formBuilder.group({
      opassword: [''],
      npassword: [''],
    });

    this.getUser();
  }

  getUser() {
    this.profileService.getUser().subscribe(result => {
      this.userResult = result;
      if (this.userResult.statusCode === 200) {
        this.userData = this.userResult.data;
        this.showSpinner = false;
      } else {
        this.errorResp = this.userResult.description;
      }
    })
  }

  onSubmit(form: NgForm) {
    this.profileService.updateUser(form.value.first_name, form.value.last_name).subscribe((resp => {
      this.respData = resp;
      if (this.respData.statusCode === 200) {
        this.getUser();
        this.resetForm(form);
      } else {
      }
    }));
  }
  onChangePasswordSubmit() {
    this.profileService.updatePassword(this.updatePasswordForm.value.npassword, this.updatePasswordForm.value.opassword)
      .subscribe(resp => {
        this.respData = resp;
        if (this.respData.statusCode === 200) {
          jQuery('.message-alert').removeClass('d-none');
          jQuery('.message-alert').addClass('alert alert-success');
          jQuery('.message-alert').html(resp.description).fadeIn(900);
          jQuery(".message-alert").fadeTo(2000, 500).slideUp(500, function () {
            jQuery(".message-alert").slideUp(500);
          });
          this.getUser();
        }
      }, error => {
        jQuery('.message-alert').removeClass('d-none');
        jQuery('.message-alert').addClass('alert alert-danger');
        jQuery('.message-alert').html(error.error.description).fadeIn(900);
        jQuery(".message-alert").fadeTo(2000, 500).slideUp(500, function () {
          jQuery(".message-alert").slideUp(500);
        });
      });


  }

  resetForm(form: NgForm) {
    this.profileService.selectedUser = {
      dob: "",
      email: "",
      first_name: "",
      gender: "",
      last_name: "",
      password: "",
      phone_number: "",
      username: "",
      cpassword: "",
    };
    form.resetForm();
  }

  requestToChangeDetails() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profForm.invalid) {
      return;
    } else {
      this.profileService.requestToChangeDetails(this.req).subscribe(result => {
        this.userChangeResult = result;
        if (this.userChangeResult.statusCode === 200) {
          this.userChangeData = this.userChangeResult.data;
        }
      }, error => {
        jQuery('.message-alert').removeClass('d-none');
        jQuery('.message-alert').addClass('alert alert-danger');
        jQuery('.message-alert').html(error.error.description).fadeIn(900);
        jQuery(".message-alert").fadeTo(2000, 500).slideUp(500, function () {
          jQuery(".message-alert").slideUp(500);
        });
      });
    }
  }

}
