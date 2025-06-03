import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/enviuronment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _HttpClient = inject(HttpClient);

  getLogedUserData(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/users/getMe`);
  }

  deleteUserAccount(): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/users/deleteMe`
    );
  }

  updateUserPass(data: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/users/changeMyPassword`,
      data
    );
  }

  getUserOrders(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders`);
  }

  addUserAddress(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/addresses`,
      data
    );
  }

  getUserِAddress(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/addresses`);
  }

  
}
