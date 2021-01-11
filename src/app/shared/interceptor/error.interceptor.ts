import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/service/authentication.service';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public authenticationService: AuthenticationService, public router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(retry(1),
      catchError(this.handleError.bind(this))
    );
  }
  handleError(error: HttpErrorResponse) {
    console.log(JSON.stringify(error));
    if (error.status === 401 || error.status === 500) {
      // this.authenticationService.logout();
      sessionStorage.removeItem('currentUser');
      this.router.navigate(['../../authentication']);
    }
    return throwError(error);
  }
}
