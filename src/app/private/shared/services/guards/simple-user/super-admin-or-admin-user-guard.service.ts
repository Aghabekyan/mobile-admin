import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../../../../core/services/auth/index';
import {UserType} from '../../../../../infrastructure/enums';

@Injectable()
export class SuperAdminOrAdminUserGuardService implements CanActivate {

  constructor(protected router: Router, protected authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.currentUser().map((data) => {
      if (data.data.typeID === UserType.SuperAdmin || data.data.typeID === UserType.Admin) {
        return true;
      } else {
        this.router.navigate(['home']);
      }
    });
  }
}

