import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { DependantService } from "../services/dependant.service";
import Swal from 'sweetalert2';
declare var jQuery: any;

@Component({
  selector: "app-dependants",
  templateUrl: "./dependants.component.html",
  styleUrls: ["./dependants.component.sass"],
})
export class DependantsComponent implements OnInit {
  showSpinner = true;
  // FILTERING
  sortingName: string;
  sortingEmail: string;

  submitted = false;
  totalDependants: any;
  errorResp: any;
  respData: any;
  hide = true;
  show = true;

  //GET ALL DEPENDANT
  allDependantResult: any;
  allDependantList: any;
  //GET DEPENDANT BY ID
  dependantResult: any;
  dependantData: any;

  constructor(
    private formBuilder: FormBuilder,
    public dependantService: DependantService
  ) {}

  ngOnInit(): void {
    this.getAllDependants();
  }

  SearchByName(){
    if(this.sortingName != ""){
    this.allDependantList = this.allDependantList.filter(res=>{
      return res.dependantUserData.first_name.toLocaleLowerCase().match(this.sortingName.toLocaleLowerCase());
    });
    }else if (this.sortingName == ""){
      this.ngOnInit();
    }
  }
  SearchByEmail(){
    if(this.sortingEmail != ""){
    this.allDependantList = this.allDependantList.filter(res=>{
      return res.dependantUserData.email.toLocaleLowerCase().match(this.sortingEmail.toLocaleLowerCase());
    });
    }else if (this.sortingEmail == ""){
      this.ngOnInit();
    }
  }

  onSubmitDependant(form: NgForm){
    document.getElementById('closeModal').click();
    this.dependantService.createDependants(form.value).subscribe((resp) => {
      this.respData = resp;
      if (this.respData.statusCode === 200) {
        this.getAllDependants();
      } else {
        this.resetForm(form);
      }
    },error =>{
      jQuery('.message-alert').removeClass('d-none');
      jQuery('.message-alert').addClass('alert alert-danger');
      jQuery('.message-alert').html(error.error.description).fadeIn(900);
      jQuery(".message-alert").fadeTo(2000, 500).slideUp(500, function () {
        jQuery(".message-alert").slideUp(500);
      });
    });
  }

  resetForm(form: NgForm) {
    this.dependantService.selectedUser = {
      dob: "",
      email: "",
      first_name: "",
      gender: "",
      last_name: "",
      password: "",
      phone_number: "",
      username: "",
    };
    form.resetForm();
  }

  getAllDependants() {
    this.dependantService.getAllDependants().subscribe((result) => {
      this.allDependantResult = result;
      if (this.allDependantResult.statusCode === 200) {
        this.allDependantList = this.allDependantResult.data;
        this.totalDependants = this.allDependantList.length;
        this.showSpinner = false;
      } else {
        this.errorResp = this.allDependantResult.description;
        this.show = false;
      }
    },error => {
      this.errorResp = error.error.description;
      this.show = false;
    });
  }

  upgradeDependant(id) {
    this.dependantService.upgradeDependant(id).subscribe(result => {
      this.dependantResult = result;
      if (this.dependantResult.statusCode === 200) {
        this.upgradeAlert();
        this.getAllDependants();
        this.dependantData = this.dependantResult.data;
      } else {
        this.errorResp = this.dependantResult.description;
      }
    })
  }

  //SWEET ALERT FUNCTION

  upgradeAlert() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your Dependant has been Upgraded',
      showConfirmButton: false,
      timer: 3000
    });
  }

  //END OF SWEET ALERT FUNCTION

}
