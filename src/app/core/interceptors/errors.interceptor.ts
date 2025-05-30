import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  // const _ToastrService = inject(ToastrService)

  return next(req).pipe(catchError( (err)=>{
    console.log("inteceptor" , err.error.message);
    // _ToastrService.error(err.error.message , "GlobeBuy")
    return throwError( ()=> err )
  }))
};
