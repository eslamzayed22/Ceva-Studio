import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/enviuronment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

interface UserInfo {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  private readonly _PLATFORM_ID  = inject(PLATFORM_ID)
  

  private userDataSubject = new BehaviorSubject<UserInfo | null>(null);
  userData:any = null;

  // ✅ تسجيل
  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  // ✅ تسجيل الدخول
  setloginForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/login`,
      data
    );
  }

  // ✅ حفظ بيانات المستخدم في الميموري
  saveUserData(): void {
    if (typeof localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }

  // ✅ فحص تسجيل الدخول
  isLoggedIn(): boolean {
    if(isPlatformBrowser(this._PLATFORM_ID)) {
      return !!localStorage.getItem('userToken');
    }
    return false;
  }

  // ✅ فحص إذا المستخدم أدمن
  isAdmin(): boolean {
    const currentUser = this.userDataSubject.getValue();
    return currentUser?.role === 'admin';
  }

  // ✅ تسجيل الخروج
  logout(): void {
    localStorage.removeItem('userToken');
    this.userDataSubject.next(null);
    this._Router.navigate(['/login']);
  }

  // ✅ استعادة كلمة المرور
  setEmailVerfiy(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/forgotPassword`,
      data
    );
  }

  setCodeVerfiy(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  setRestPassword(data: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
