import { NgModule, Optional, SkipSelf } from '@angular/core';
import {throwIfAlreadyLoaded} from '../../infrastructure/utils';

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  providers: [
  ],
  exports: [
  ],
})
export class CommonsSharedModule {
  constructor(@Optional() @SkipSelf() parentModule: CommonsSharedModule) {
    throwIfAlreadyLoaded(parentModule, 'CommonsSharedModule');
  }
}
