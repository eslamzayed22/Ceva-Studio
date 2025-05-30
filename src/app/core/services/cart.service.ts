import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/enviuronment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient)

  cartNumber : WritableSignal<number> =signal(0)

  addToCart(data: { productId: string; size: string; color?: string  }):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      data) 
  }

  getProductsCart():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`) 
  }

  deleteSpecificItem(id:string):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`) 
  }
  updateProductQuantity(id:string, newCount:number):Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {"quantity": newCount}) 
  }

  clearCart():Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`) 
  }

}
