import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../components/auth/services/authService/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const newRequest = req.clone({
    setHeaders: {Authorization: `Bearer ${token}`},
  });
  return next(newRequest);
};
