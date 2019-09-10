import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  AuthGuardService,
  SuperAdminGuardService,
  SuperAdminOrAdminUserGuardService,
  UserProfileService,
  PrivateResolverService,
  UserRegisterService,
  NaturesService,
  AreasService,
  CategoriesService,
  GeneralInfoService,
  SurveysService,
  FileService
} from './services/index';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { TopBarComponent, MenuComponent, MapComponent } from './components/index';
import { TableModule } from 'primeng/table';
import {
  PanelMenuModule, MenubarModule, SidebarModule, ButtonModule, DropdownModule, InputTextModule,
  MultiSelectModule, OverlayPanelModule, TooltipModule, InputMaskModule, CalendarModule, TreeTableModule,
  ConfirmDialogModule,
} from 'primeng/primeng';
import { GalleriaModule } from 'primeng/galleria';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabMenuModule } from 'primeng/tabmenu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HasRolePipe, SafePipe } from './pipes/index';
import { SharedModule } from '../../shared/shared.module';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardModule } from 'primeng/card';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import {InputSwitchModule} from 'primeng/inputswitch';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    SidebarModule,
    PanelMenuModule,
    MenubarModule,
    ButtonModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputMaskModule,
    CalendarModule,
    TooltipModule,
    ToastModule,
    TreeTableModule,
    TreeModule,
    SelectButtonModule,
    SharedModule,
    TabMenuModule,
    InputTextareaModule,
    TabViewModule,
    FileUploadModule,
    CheckboxModule,
    ScrollPanelModule,
    RadioButtonModule,
    GalleriaModule,
    LightboxModule,
    ListboxModule,
    InputSwitchModule
  ],
  declarations: [
    TopBarComponent,
    MenuComponent,
    MapComponent,
    HasRolePipe,
    SafePipe
  ],
  exports: [
    DialogModule,
    TableModule,
    CalendarModule,
    PanelMenuModule,
    MenubarModule,
    SidebarModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule,
    TooltipModule,
    InputMaskModule,
    ConfirmDialogModule,
    TopBarComponent,
    MenuComponent,
    MapComponent,
    MultiSelectModule,
    TreeTableModule,
    TreeModule,
    SharedModule,
    HasRolePipe,
    SelectButtonModule,
    ToastModule,
    TabMenuModule,
    InputTextModule,
    InputTextareaModule,
    TabViewModule,
    FileUploadModule,
    CheckboxModule,
    SafePipe,
    CardModule,
    RadioButtonModule,
    GalleriaModule,
    ScrollPanelModule,
    LightboxModule,
    ListboxModule,
    InputSwitchModule
  ]
})

export class PrivateSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PrivateSharedModule,
      providers: [
        ConfirmationService,
        MessageService,
        AuthGuardService,
        SuperAdminGuardService,
        SuperAdminOrAdminUserGuardService,
        UserProfileService,
        PrivateResolverService,
        UserRegisterService,
        CategoriesService,
        NaturesService,
        GeneralInfoService,
        AreasService,
        SurveysService,
        FileService
      ]
    };
  }
}
