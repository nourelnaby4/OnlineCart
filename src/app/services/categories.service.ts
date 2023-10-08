import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../const/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this._httpClient.get(`${baseURL}/api/v1/categories`);
  }


}
