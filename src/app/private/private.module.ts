import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrivateComponent } from './private.component';
import { PrivateSharedModule } from './shared/shared.module';
import { UserProfileComponent, HomeComponent, CategoriesComponent, NatureComponent, AreaComponent, FeedbacksComponent, SurveyDetailsComponent, SurveysComponent } from './index';
import { PrivateRoutingModule } from './private.routing.module';
import { AdminRegistrationComponent } from './registration';

@NgModule({
  imports: [
    PrivateRoutingModule,
    PrivateSharedModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    UserProfileComponent,
    PrivateComponent,
    CategoriesComponent,
    FeedbacksComponent,
    NatureComponent,
    AreaComponent,
    SurveyDetailsComponent,
    AdminRegistrationComponent,
    SurveysComponent
  ]
})
export class PrivateModule {
}
