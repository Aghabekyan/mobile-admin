import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthService} from './core/services';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {CookieModule, CookieService} from 'ngx-cookie';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

export function authHttpServiceFactory(cookieService: CookieService) {
  return {
    headerName: 'Authorization',
    authScheme: 'Bearer ',
    tokenName: 'access_token',
    tokenGetter: (() => cookieService.get('access_token')),
    whitelistedDomains: environment.whitelistedDomains,
    throwNoTokenError: false,
    skipWhenExpired: true
  };
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: authHttpServiceFactory,
        deps: [CookieService]
      }
    })
  ],
  providers: [
    AuthService,
    CookieService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
