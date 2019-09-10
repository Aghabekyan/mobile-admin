import {ModuleWithProviders, NgModule} from '@angular/core';
import {
  PublicGuardService,
  ForgotPasswordService,
  SetPasswordService,
  SetPasswordResolver,
  ConfirmEmailResolver,
  ConfirmEmailService,
} from './services/index';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [],
  exports: [
    SharedModule
  ],
  providers: [],
})

export class PublicSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PublicSharedModule,
      providers: [
        ForgotPasswordService,
        PublicGuardService,
        SetPasswordService,
        SetPasswordResolver,
        ConfirmEmailResolver,
        ConfirmEmailService
      ]
    };
  }
}
