import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {PublicRestService} from '../../../../core/services/rest';
import {SharedService} from '../../../../core/services/shared';
import {ConfirmEmail, ValidateCodeModel} from '../../../../infrastructure/models';
import {AuthService} from '../../../../core/services/auth';
import {LocalizationService} from '../../../../core/services/localization';
import {HttpClient} from '@angular/common/http';
import {Http} from '@angular/http';
import {ConfirmEmailService} from '../confirm-email';

@Injectable()
export class ConfirmEmailResolver implements Resolve<any> {


  constructor(private router: Router,
              private localizationService: LocalizationService,
              private confirmEmailService: ConfirmEmailService) {
  }

  resolve(route: ActivatedRouteSnapshot): any {
    const code = route.queryParams['code'];
    const userId = route.queryParams['userId'];
    if (code && userId) {
      const validateCode = {code: code, userId: userId};
      return this.confirmEmailService.confirmEmail(new ConfirmEmail(<IConfirmEmail>validateCode)).toPromise()
        .then((res: any) => {
          if (res.success) {
            return {
              success: true,
              message: res.message ? res.message : ''
            };
          } else {
            this.localizationService.navigateTo('login');
          }
        }).catch(err => {
          this.localizationService.navigateTo('login');
        });
    } else {
      this.localizationService.navigateTo('login');
    }
  }


}
