import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const _Router = inject(Router);
  const _AuthService = inject(AuthService);

  const isAdmin = _AuthService.isAdmin();  // هي دي boolean

  if (isAdmin) {
    return true;  // هو أدمن
  } else if (_AuthService.isLoggedIn()) {
    // لو مسجل دخول بس مش أدمن
    _Router.navigate(['/home']);
    return false;
  } else {
    // مش مسجل دخول أصلاً
    _Router.navigate(['/login']);
    return false;
  }
};
