import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { baseURL } from '../const/environment';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  UserData =new BehaviorSubject( null);
  constructor(public _httpClient: HttpClient) {

    if(localStorage.getItem('userToken')!==null){
      this.decodeUserData();
    }
   }

  decodeUserData():void{
    let encodeUserData:string=JSON.stringify(localStorage.getItem('userToken'));
    // install jwt-decode ==> npm i jwt-deocde
    let decodeUserData:any=jwtDecode(encodeUserData);
     this.UserData.next(decodeUserData);
  }
  register(UserData: any): Observable<any> {
    return this._httpClient.post(`${baseURL}/api/v1/auth/signup`, UserData);
  }
  login(UserData: any): Observable<any> {

    return this._httpClient.post(`${baseURL}/api/v1/auth/signin`, UserData);
  }

}
