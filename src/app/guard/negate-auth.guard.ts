import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const negateAuthGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)

  if(localStorage.getItem("token")) {
    router.navigate(['/home'])
    return false
  }
  return true;
};
