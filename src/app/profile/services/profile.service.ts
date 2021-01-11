import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { Users } from "../../interface/users";
import { ResponseType } from '../../../interfaces/response';

export class Request {
  constructor(
    public new_details: string,
    public password: string,
    public subject: string
  ) { }
}

@Injectable({
  providedIn: "root",
})

export class ProfileService {
  selectedUser: Users = {
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

  constructor(private http: HttpClient, private router: Router) { }

  getUser(): Observable<ResponseType> {
    return this.http.get<ResponseType>(`${environment.apiUrl}/users/user/get`).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  updateUser(first_name, last_name): Observable<ResponseType> {
    const params = new HttpParams()
      .set("firstname", first_name)
      .set("lastname", last_name);
    return this.http.put<ResponseType>(`${environment.apiUrl}/users/user/edit-name`, params).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  updatePassword(npassword, opassword): Observable<ResponseType> {
    const params = new HttpParams()
      .set("npassword", npassword)
      .set("opassword", opassword);
    return this.http.put<ResponseType>(`${environment.apiUrl}/users/user/updatepassword`, params).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  // getAllPermissions(): Observable<ResponseType> {
  //   return this.http.get<ResponseType>(`${environment.apiUrl}/permissions/permission/getall`).pipe(
  //     map((resp) => {
  //       return resp;
  //     })
  //   );
  // }

  getUserAllPermissions(): Observable<ResponseType> {
    return this.http.get<ResponseType>(`${environment.apiUrl}/permissions/user/allpermissions/get`).pipe(map((resp) => {
      return resp;
    }))
  }

  requestToChangeDetails(requestchange): Observable<ResponseType> {
    return this.http.post<ResponseType>(`${environment.apiUrl}/users/user/request_changes/create`, requestchange).pipe(map((resp: any) => {
      return resp;
    })
    );
  }
}
