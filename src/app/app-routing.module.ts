import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './public/public.module#PublicModule' },
  { path: '', loadChildren: './private/private.module#PrivateModule' },
  { path: '', loadChildren: './commons/commons.module#CommonsModule' },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
