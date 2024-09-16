import { CanActivateFn } from '@angular/router';
import { SellerService } from './sellerservice/seller.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export const sellerauthGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);
  const router = inject(Router); // Inject the Router for navigation

  if (localStorage.getItem('seller')) {
    return true; // User is logged in as a seller
  }

  return sellerService.isSellerLoggedIn.pipe(
    map((issellerLoggedIn: boolean) => {
      if (issellerLoggedIn) {
        return true; // Allow navigation if logged in
      } else {
        router.navigate(['/seller']); // Redirect to seller login page if not authenticated
        return false; // Block navigation
      }
    })
  );
};
