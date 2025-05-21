import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);

  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole'); // تأكد أنك تخزن الدور في localStorage بعد تسجيل الدخول

    if (token !== null && role === 'admin') {
      return true;
    } else {
      _Router.navigate(['/login']); // أو أي صفحة أخرى مناسبة
      return false;
    }
  } else {
    return false;
  }
};