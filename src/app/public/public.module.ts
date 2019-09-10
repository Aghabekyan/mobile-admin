import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public.routing.module';
import { PublicSharedModule } from './shared/shared.module';
import { LoginComponent } from './login/index';
import { ForgotPasswordComponent } from './forgot-password/index';
import { SetPasswordComponent } from './set-password/set-password.component';
import {ResolveComponent} from './resolve/resolve.component';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';



@NgModule({
  imports: [
    PublicRoutingModule,
    CardModule,
    CheckboxModule,
    PublicSharedModule.forRoot()
  ],
  declarations: [
    PublicComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResolveComponent,
    SetPasswordComponent
  ]
})

export class PublicModule { }
