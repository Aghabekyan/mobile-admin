import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {PrivateComponent} from './private.component';
import {AuthGuardService, SuperAdminGuardService, PrivateResolverService} from './shared/services/index';
import {CategoriesComponent, HomeComponent, UserProfileComponent, NatureComponent, AreaComponent, FeedbacksComponent, SurveyDetailsComponent, SurveysComponent} from './index';
import {AdminRegistrationComponent} from './registration';
import {SuperAdminOrAdminUserGuardService} from './shared/services/guards/simple-user';

const routes: Routes = [
  {
    path: '', component: PrivateComponent, canActivate: [AuthGuardService], resolve: {user: PrivateResolverService}, children: [
      {path: 'home', component: HomeComponent},
      {path: 'user-profile', component: UserProfileComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'natures', component: NatureComponent},
      {path: 'areas', component: AreaComponent},
      {path: 'feedbacks', component: FeedbacksComponent, canActivate: [SuperAdminOrAdminUserGuardService]},
      {path: 'surveys', component: SurveysComponent, canActivate: [SuperAdminOrAdminUserGuardService]},
      {path: 'survey-details/:id', component: SurveyDetailsComponent, canActivate: [SuperAdminOrAdminUserGuardService]},
      {path: 'register', component: AdminRegistrationComponent, canActivate: [SuperAdminGuardService]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PrivateRoutingModule {
}



// public static LatLng getCentroid(List<LatLng> points) {
//   double[] centroid = {0.0, 0.0};

//   for (int i = 0; i < points.size(); i++) {
//       centroid[0] += points.get(i).latitude;
//       centroid[1] += points.get(i).longitude;
//   }

//   int totalPoints = points.size();
//   centroid[0] = centroid[0] / totalPoints;
//   centroid[1] = centroid[1] / totalPoints;

//   return new LatLng(centroid[0], centroid[1]);
// }
