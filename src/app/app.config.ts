import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { ErrorInterceptor } from './pages/core/interceptors/error.interceptor';
import { AuthInterceptor } from './pages/core/interceptors/auth.interceptor';

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
