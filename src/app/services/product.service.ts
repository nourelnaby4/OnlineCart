import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { baseURL } from '../const/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient:HttpClient) { }
  getProducts():Observable<any>{
    return this._httpClient.get(`${baseURL}/api/v1/products`);
  }
  getProductDetails(id:string):Observable<any>{
    return this._httpClient.get(`${baseURL}/api/v1/products/${id}`);
  }

  getByCategoryId(categoryId: string): Observable<any> {
    return this._httpClient.get(`${baseURL}/api/v1/products?category=${categoryId}`)
  };
}
