import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mycontacts',
  templateUrl: './mycontacts.component.html',
  styleUrls: ['./mycontacts.component.sass']
})
export class MycontactsComponent implements OnInit {

  //GET ALL USERS
  AllUsersResult: any;
  allUserList: any;

  //GET USRES BY ID
  userResult: any;
  userData: any;

  // ERROR RESPONSE
  errorResp: any;

  constructor() { }

  ngOnInit(): void {
  }

}
