import {NgModule, Optional, SkipSelf} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedService, LoadingService, AuthService, LocalizationService, LocalService} from './services';
import {throwIfAlreadyLoaded} from '../infrastructure/utils';
import {
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
@NgModule({
  imports: [
    RouterModule,
    TranslateModule.forRoot()
  ],

  exports: [
    TranslateModule
  ],

  declarations: [],

  providers: [
    SharedService,
    LocalizationService,
    LoadingService,
    AuthService,
    LocalService,
    TranslateService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
