import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

    const _PLATFORM_ID  = inject(PLATFORM_ID)

  if (isPlatformBrowser(_PLATFORM_ID)) {
    const userToken = localStorage.getItem('userToken');
    // console.log('userToken:', userToken);
    
    if (userToken !== null) {
      if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${userToken}`
          }
        });
      }
    }
  }

  return next(req);
};
