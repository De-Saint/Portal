import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../authentication/service/authentication.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneRequest = this.addToken(request);
    return next.handle(cloneRequest);
  }


  // Adds the token to your headers if it exists
  private addToken(request: HttpRequest<any>) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      const token = currentUser.token;
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
      return clone;
    }
    return request;
  }
}
