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

  headerToken:any={
    'token':localStorage.getItem('userToken')
  }
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let updatedRequest=request.clone({
      setHeaders:this.headerToken
    })
    return next.handle(updatedRequest);
  }
}
