import { HttpEvent, HttpEventType, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, tap, throwError } from 'rxjs';
import { ToastrNotificationService } from '../service/toastr-notification.service';


export const loggingInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrNotificationService)

  if(localStorage.getItem('token')){
     req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
     })
  }
  // return next(req).pipe(tap(event => {
  //   if (event.type === HttpEventType.ResponseHeader) {
  //     console.log(req.url, 'returned a response with status', event.status);
  //     console.log(event.status)
  //     if(event.status==403){
  //       console.log('Forbidden: Access is denied.'); 
  //     }
  //   }
  // }));
 

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
  catchError((error) => {
    if (error.status === 403) {
      console.log('403 Forbidden: Access is denied.');
      toastr.showError('403 Forbidden: Access is denied.');
    } else {
      // Handle other error cases here
      console.error(error.message);
      toastr.showError('Error: ' + error.message);
    }

    // You may want to return a custom observable for the error case
    return of(error);
  })
);

};