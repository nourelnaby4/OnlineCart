import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseURL } from '../const/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemCount = new BehaviorSubject<number>(0);
  cartID = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }


  addCart(productId: string): Observable<any> {
    return this._httpClient.post(`${baseURL}/api/v1/cart`, { productId: productId });
  }

  getUserLogged(): Observable<any> {
    return this._httpClient.get(`${baseURL}/api/v1/cart`);
  }

  removeCartItem(productId: string): Observable<any> {
    return this._httpClient.delete(`${baseURL}/api/v1/cart/${productId}`);
  }

  updateCartItemCount(productId: string, count: number): Observable<any> {
    return this._httpClient.put(`${baseURL}/api/v1/cart/${productId}`, { count: count });
  }

  onlinePayment(shippingAddress:any,url:string,cartId:any){
    return this._httpClient.post(`${baseURL}/api/v1/orders/checkout-session/${cartId}?url=${url}/home`,
    { shippingAddress: shippingAddress });
  }

}
