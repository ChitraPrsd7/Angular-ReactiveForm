import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrNotificationService } from '../service/toastr-notification.service';

export const httpInterceptInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrNotificationService)

  if (localStorage.getItem('token')) {
    req = req.clone({
      setHeaders: {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }


  
  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {
        console.log('Success', event);
        const successMessage = event.body && event.body.message;
        if (successMessage) {
          toastr.showSuccess(successMessage);
        } else {
          toastr.showSuccess('Request successful');
        }
      }
    }),
    catchError((error)=>{
      if(error.status==403){
        console.log('403 Forbidden: Access is denied.');
        toastr.showError("403 Forbidden: Access is denied.")
      }
      console.error(error.message);
      return throwError(() => error);
    })
  );
};
