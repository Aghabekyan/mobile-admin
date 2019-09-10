import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FORGOT_PASSWORD_API_URL} from './forgot-password.url';
import {ForgotPasswordModel} from '../../../../infrastructure/models/index';
import {PublicRestService} from '../../../../core/services/rest/index';
import {environment} from '../../../../../environments/environment';


@Injectable()
export class ForgotPasswordService extends PublicRestService {

  protected getHostingUrl(url) {
    return `${environment.userHostingUrl + url}`;
  }

  forgotPassword(forgotPasswordModel: ForgotPasswordModel): Observable<IResponse<Object | void>> {
    return this.post(FORGOT_PASSWORD_API_URL.forgotPassword, forgotPasswordModel);
  }
}
