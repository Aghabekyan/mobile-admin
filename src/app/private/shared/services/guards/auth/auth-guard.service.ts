import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../../../../core/services/auth/index';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(protected router: Router, protected authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (state.url !== '/login' && !this.authService.isAuthenticated()) {
      this.authService.logOut();
      const navigationExtras: NavigationExtras = {
        queryParams: {'redirectUrl': state.url}
      };
      this.router.navigate(['/login'], navigationExtras);
      return false;
    }

    return true;
  }
}
