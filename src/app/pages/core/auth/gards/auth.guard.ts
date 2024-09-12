import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Inject the AuthService
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;  // Allow access if authenticated
  } else {
    router.navigate(['/login']);  // Redirect to login if not authenticated
    return false;
  }
};
