import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, NgForm } from "@angular/forms";


import { AuthenticationService } from "../service/authentication.service";
declare var jQuery: any;

@Component({
  selector: "app-memberregistration",
  templateUrl: "./memberregistration.component.html",
  styleUrls: ["./memberregistration.component.sass"],
  providers: [AuthenticationService],
})
export class MemberregistrationComponent implements OnInit {
  submitted = false;
  returnUrl: string;
  respData: any;
  error: string;
  hide = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onSubmit(form: NgForm) {
    this.authService.postUsers(form.value).subscribe((resp) => {
      this.respData = resp;
      if (this.respData.statusCode === 200) {
        this.router.navigate(['/authentication/changenumber'], { queryParams: { 'email': form.value.email, 'password': form.value.password} });
      }
      this.resetForm(form);
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
    this.authService.selectedUser = {
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
}
