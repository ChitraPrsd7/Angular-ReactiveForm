import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {
  showCancel(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string){
      this.toastr.success(message);
  }

  showError(message:string){
    this.toastr.error(message);
  }
  
}
