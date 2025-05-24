import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);

  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole');

    if (token && role === 'admin') {
      return true;
    } else {
      _Router.navigate(['/login']);
      return false;
    }
  }

  return false;
};
