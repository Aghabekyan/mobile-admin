import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {AuthService} from '../../../../core/services/auth/index';


@Injectable()
export class PrivateResolverService implements Resolve<any> {

  constructor(private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot): any {
    return this.authService.currentUser().map((res: IResponse<IUserClaim>) => {
      return res.data;
    }).first();
  }
}
