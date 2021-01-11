import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Dependants } from "../model/dependantMod";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DependantService {
  selectedUser: Dependants = {
    dob: "",
    email: "",
    first_name: "",
    gender: "",
    last_name: "",
    password: "",
    phone_number: "",
    username: "",
  };

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  createDependants(user: Dependants){
    const newUser = {
      firstName: user.first_name,
      lastName: user.last_name,
      dob: this.datePipe.transform(user.dob, "dd-MM-yyyy"),
      password: user.password,
      email: user.email,
      gender: user.gender,
      phone: user.phone_number,
      userName: user.username,
    };
    return this.http.post(`${environment.apiUrl}/users/dependant/create`, newUser).pipe(map((resp)=>{
      return resp;
    }))
  }

  getAllDependants(){
    return this.http.get(`${environment.apiUrl}/users/dependants/get`).pipe(map((resp)=>{
      return resp;
    }))
  }

  upgradeDependant(id){
    return this.http.put(`${environment.apiUrl}/users/dependants/upgrade/${id}`, {}).pipe(map((resp) => {
      return resp;
    }))
  }

}
