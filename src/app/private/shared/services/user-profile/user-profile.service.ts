import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {USER_PROFILE_API_URL} from './user-profile.url';
import {environment} from '../../../../../environments/environment';
import {RestService} from '../../../../core/services/rest/index';

@Injectable()

export class UserProfileService extends RestService {

  protected getHostingUrl(url) {
    return `${environment.userHostingUrl + url}`;
  }

  public update(data: IUserProfile): Observable<IResponse<Object | void>> {
    return this.put<Object>(USER_PROFILE_API_URL.update, data);
  }

  public changePassword(model: IChangePassword): Observable<IResponse<Object | void>> {
    return this.post<Object>(USER_PROFILE_API_URL.changePassword, model);
  }
}
