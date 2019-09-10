import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PublicRestService} from '../../../../core/services/rest/index';
import {SET_PASSWORD_API_URL} from './set-password.url';
import {SetPasswordModel, ValidateCodeModel} from '../../../../infrastructure/models/index';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class SetPasswordService extends PublicRestService {

  protected getHostingUrl(url) {
    return `${environment.userHostingUrl + url}`;
  }

  validateCode(validateCodeModel: ValidateCodeModel): Observable<IResponse<Object | void>> {
    return this.post(SET_PASSWORD_API_URL.validateCode, validateCodeModel);
  }

  getUserByID(userId: number): Observable<IResponse<Object | void>> {
    return this.retrieve(SET_PASSWORD_API_URL.getUserByID + userId.toString()).map(res => res.json());
  }

  resetPassword(setPasswordModel: SetPasswordModel): Observable<IResponse<Object | void>> {
    return this.post(SET_PASSWORD_API_URL.resetPassword, setPasswordModel);
  }

}
