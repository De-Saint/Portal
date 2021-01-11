import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-mypermissions',
  templateUrl: './mypermissions.component.html',
  styleUrls: ['./mypermissions.component.sass']
})
export class MypermissionsComponent implements OnInit {
  showSpinner = true;

  //GET USER BY ID
  userResult: any;
  userData: any;

  //GET User PERMISSION BY ID
  userPermissionResult: any;
  userPermissionListData: any;

  // ERROR RESPONSE
  errorResp : any;

  constructor(
    public profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getAllUserPermissions();
  }

  getUser(){
    this.profileService.getUser().subscribe(result =>{
      this.userResult = result;
      if(this.userResult.statusCode === 200){
        this.userData = this.userResult.data;

      }else{
        this.errorResp = this.userResult.description;
      }
    })
  }

  getAllUserPermissions() {
    this.profileService.getUserAllPermissions().subscribe(result => {
      this.userPermissionResult = result;
      if (this.userPermissionResult.statusCode === 200) {
        this.userPermissionListData = this.userPermissionResult.data;
        this.showSpinner = false;
      } else {
        this.errorResp = this.userPermissionResult.description;
      }
    })
  }

}
