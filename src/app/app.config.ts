import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './pages/shared/interceptors/auth.interceptor';
import { ErrorInterceptor } from './pages/shared/interceptors/error.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configure router
    provideAnimations(), // Provide animations
    provideToastr(),
    provideHttpClient(withInterceptors([
      AuthInterceptor,
      ErrorInterceptor
    ])), // Provide Interseptors
  ]
};
