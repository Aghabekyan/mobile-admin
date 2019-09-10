import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonsRoutingModule} from './commons-routing.module';
import {CommonsComponent} from './commons.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CommonsSharedModule} from './shared/shared.module';
import {SharedModule} from '../shared/shared.module';
import {throwIfAlreadyLoaded} from '../infrastructure/utils';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    CommonsRoutingModule,
    CommonsSharedModule
  ],
  declarations: [
    CommonsComponent,
    PageNotFoundComponent
  ],
  providers: []
})
export class CommonsModule {
  constructor(@Optional() @SkipSelf() parentModule: CommonsModule) {
    throwIfAlreadyLoaded(parentModule, 'CommonsModule');
  }
}
