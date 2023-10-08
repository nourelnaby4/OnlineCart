import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../const/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  // token: string | null = localStorage.getItem('userToken');
  constructor(private _httpCleint: HttpClient) { }

  getAll(): Observable<any> {
    return this._httpCleint.get(`${baseURL}/api/v1/wishlist`);
  };

  add(productId: string): Observable<any> {
    return this._httpCleint.post(`${baseURL}/api/v1/wishlist`, { "productId": productId });
  }

  delete(productId: string): Observable<any> {
    return this._httpCleint.delete(`${baseURL}/api/v1/wishlist/${productId}`);
  }
}
