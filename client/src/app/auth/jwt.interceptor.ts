import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private router : Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
      Authorization: `Bearer ${this.auth.getToken()}`,
      },
    });

    return next.handle(request).pipe(catchError((err : any) => {
      if (err.status === 401) {
        this.auth.logout()
        this.router.navigate([''])
      }
      const error = err.error.message || err.statusText
      return throwError(error)
    }));
  }

}

