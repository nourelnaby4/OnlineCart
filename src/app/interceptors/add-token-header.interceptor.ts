import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddTokenHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if 'userToken' exists in localStorage
    const userToken = localStorage.getItem('userToken');

    // Create an empty header object
    let headerToken: { [key: string]: string } = {};

    // If 'userToken' exists, set it in the header
    if (userToken) {
      headerToken['token'] = userToken;
    }

    // Clone the request with the updated headers
    let updatedRequest = request.clone({
      setHeaders: headerToken
    });

    return next.handle(updatedRequest);
  }
}
