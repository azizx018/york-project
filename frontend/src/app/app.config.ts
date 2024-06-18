import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {OktaAuthModule} from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';
import { ResponseInterceptor } from './utilities/logging.interceptor';
import {provideNgxMask} from 'ngx-mask';


const oktaAuth = new OktaAuth({
  issuer: 'https://dev-00236918.okta.com/oauth2/default',
  clientId: '0oahn69ttlScdqdlr5d7',
  redirectUri: window.location.origin + '/login/callback'
});




export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(OktaAuthModule.forRoot({ oktaAuth })),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideNgxMask(),
    
    
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ]
};
