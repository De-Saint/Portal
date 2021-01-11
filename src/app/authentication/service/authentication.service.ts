import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { DatePipe } from "@angular/common";

import { Users } from "../../interface/users";
import { User } from "../../interface/user";
import { environment } from "../../../environments/environment";
import { ResponseType } from "../../../interfaces/response";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private navigationData = [];
  private navData:any;
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

  respData: any;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email, password) : Observable<ResponseType>{
    const params = new HttpParams()
      .set("username_email", email)
      .set("password", password);
    return this.http.post<ResponseType>(`${environment.apiUrl}/auth/login`, params).pipe(
      map((resp) => {
        this.respData = resp;
        if (this.respData.statusCode === 200) {
          sessionStorage.setItem(
            "currentUser",
            JSON.stringify(this.respData.data)
          );
          this.currentUserSubject.next(this.respData.data);
        }
        return resp;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["/authentication"]);
  }

  postUsers(user: Users): Observable<ResponseType> {
    // cpassword: user.cpassword,

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

    return this.http.post<ResponseType>(`${environment.apiUrl}/users/user/register`, newUser).pipe(
      map((resp) => {
        this.respData = resp;
        if (this.respData.statusCode === 200) {
          sessionStorage.setItem(
            "currentUser",
            JSON.stringify(this.respData.data)
          );
          this.currentUserSubject.next(this.respData.data);
        }
        return resp;
      })
    )
      .pipe(
        catchError((err) => {
          const error = err;
          return throwError(error);
        })
      );
  }

  requestPassword(email): Observable<ResponseType> {
    const params = new HttpParams()
      .set("email", email);
    return this.http.post<ResponseType>(`${environment.apiUrl}/users/user/password/request`, params).pipe(
      map((resp) => {
        return resp;
      })
    )
  }

  confirmAccount(verificationcode): Observable<ResponseType> {
    const params = new HttpParams()
      .set("verificationcode", verificationcode);
    return this.http.post<ResponseType>(`${environment.apiUrl}/users/user/activate`, params).pipe(
      map((resp) => {
        return resp;
      })
    )
  }

  resetPassword(verificationCode, newPassword): Observable<ResponseType> {
    const params = new HttpParams()
      .set("verificationCode", verificationCode)
      .set("newPassword", newPassword);
    return this.http.post<ResponseType>(`${environment.apiUrl}/users/user/password/reset`, params).pipe(
      map((resp) => {
        return resp;
      })
    )
  }
}
