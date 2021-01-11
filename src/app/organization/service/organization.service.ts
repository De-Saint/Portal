import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  getAllUserOrganizations(){
    return this.http.get(`${environment.apiUrl}/users/organizations/user/get`).pipe(map((resp)=>{
      return resp;
    }))
  }

}
