import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CONFIRM_EMAIL_API_URL} from './confirm-email.url';
import {PublicRestService} from '../../../../core/services/rest/index';
import {environment} from '../../../../../environments/environment';
import {ConfirmEmail} from '../../../../infrastructure/models';

@Injectable()
export class ConfirmEmailService extends PublicRestService {

  protected getHostingUrl(url) {
    return `${environment.userHostingUrl + url}`;
  }

  confirmEmail(model: ConfirmEmail): Observable<IResponse<Object | void>> {
    return this.post(CONFIRM_EMAIL_API_URL.confirmEmail, model);
  }
}
