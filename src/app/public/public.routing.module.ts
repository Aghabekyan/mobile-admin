import {NgModule} from '@angular/core';
import {PublicComponent} from './public.component';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/index';
import {ForgotPasswordComponent} from './forgot-password/index';
import {ConfirmEmailResolver, PublicGuardService} from './shared/services/index';
import {SetPasswordComponent} from './set-password/index';
import {SetPasswordResolver} from './shared/services/index';
import {ResolveComponent} from './resolve/resolve.component';

const routes: Routes = [
  {
    path: '', canActivate: [PublicGuardService], component: PublicComponent, children: [
      {path: '', redirectTo: 'login'},
      {path: 'login', component: LoginComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'set-password', component: SetPasswordComponent, resolve: {info: SetPasswordResolver}},
      {path: 'confirm-email', component: ResolveComponent, resolve: {data: ConfirmEmailResolver}},

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})

export class PublicRoutingModule {
}


