import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../core/auth/services/authService/auth.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken(); // Get the auth token from AuthService
  if (token) {
    // Clone the request and add the Authorization header
    const authReq = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`},
    });
    return next(authReq);
  }
  return next(req);
};
