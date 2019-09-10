import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from './components';
import {
  ButtonModule,
  CheckboxModule,
  MessageModule,
  MessagesModule,
  InputTextModule,
  DropdownModule,
} from 'primeng/primeng';


@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    MessageModule,
    MessagesModule,
    LoaderComponent
  ]
})

export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
