import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Router} from '@angular/router';
import {SetPasswordService} from '../set-password/index';
import {ValidateCodeModel} from '../../../../infrastructure/models/index';
import 'rxjs/add/operator/first';

@Injectable()
export class SetPasswordResolver implements Resolve<any> {

  constructor(private setPasswordService: SetPasswordService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): any {
    const code = route.queryParams['code'];
    const userId = route.queryParams['userId'];
    if (code && userId) {
      const validateCode = {code: code, userId: userId};
      return this.setPasswordService.validateCode(new ValidateCodeModel(validateCode)).map((res: IResponse<Object>) => {
          if (res.success) {
            return {
              success: true,
              code: code,
              email: res.data || ''
            };
          } else {
            this.router.navigate(['/login']);
          }
        }, err => {
        this.router.navigate(['/login']);
      }).first();
    } else {
      this.router.navigate(['/login']);
    }
  }

}
