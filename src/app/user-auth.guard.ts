import { CanActivateFn } from '@angular/router';
import { SellerService } from './sellerservice/seller.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export const userAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router); // Inject the Router for navigation

  const sellerService = inject(SellerService);

  if(localStorage.getItem('user')){
   return true;
  }

  return sellerService.isUserLoggedIn.pipe(
    map((isuserLoggedIn: boolean) => {
      if (isuserLoggedIn) {
        return true; // Allow navigation if logged in
      } else {
        router.navigate(['/user-login']); // Redirect to seller login page if not authenticated
        return false; // Block navigation
      }
    })
  );
};


