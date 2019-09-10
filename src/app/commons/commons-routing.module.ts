import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonsComponent} from './commons.component';
import {PageNotFoundComponent} from './page-not-found';

const routes: Routes = [
  {
    path: '', component: CommonsComponent, children: [
      {path: 'page-not-found', component: PageNotFoundComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonsRoutingModule { }
