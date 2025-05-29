import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _NgxSpinnerService = inject(NgxSpinnerService);
  const minDuration = 600; // أقل مدة لظهور السبنر (بالملي ثانية - هنا نص ثانية)
  const startTime = Date.now();

  _NgxSpinnerService.show();

  return next(req).pipe(
    finalize(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = minDuration - elapsed;

      if (remainingTime > 0) {
        setTimeout(() => {
          _NgxSpinnerService.hide();
        }, remainingTime);
      } else {
        _NgxSpinnerService.hide();
      }
    })
  );
};
