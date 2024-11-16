import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import {provideNgxStripe} from 'ngx-stripe';


export const appConfig: ApplicationConfig = {
  providers: 
  [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withInterceptors([tokenInterceptor]), withFetch()),
    provideNgxStripe('pk_test_51QKs8ELXEFPikSfqQzvTiAGjnJpd9bYQxbQgV5p6ysLakftRVyOb3LhDFrMN3bcHtpTZSI4XQXQt7XFra45vkyNx00pseTS9i3')
  ],
};
