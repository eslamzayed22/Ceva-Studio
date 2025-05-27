import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/enviuronment';
import { jwtDecode } from 'jwt-decode';

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

  private userDataSubject = new BehaviorSubject<UserInfo | null>(null);
  userData$ = this.userDataSubject.asObservable();

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
  saveUserData(token: string, name: string, role: string): void {
    localStorage.setItem('userToken', token); // يمكن لاحقاً استبداله بـ sessionStorage
    localStorage.setItem('username', name);

    try {
      const decoded: DecodedToken = jwtDecode(token);
      if (decoded?.exp * 1000 > Date.now()) {
        this.userDataSubject.next({ username: name, role });
      } else {
        this.logout();
      }
    } catch (e) {
      console.error('error in token decode', e);
      this.logout();
    }
  }

  // ✅ فحص تسجيل الدخول
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }

  // ✅ فحص إذا المستخدم أدمن
  isAdmin(): boolean {
    const currentUser = this.userDataSubject.getValue();
    return currentUser?.role === 'admin';
  }

  // ✅ تسجيل الخروج
  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
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
