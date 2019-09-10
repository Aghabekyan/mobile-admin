import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {RestService} from '../../../../core/services/rest/index';
import {REGISTER_API_URL} from './user.register.url';

@Injectable()
export class UserRegisterService extends RestService {

  protected getHostingUrl(url) {
    return `${environment.userHostingUrl + url}`;
  }

  public register(model: IRegister): Observable<IResponse<IUserManipulation | void>> {
    return this.post(REGISTER_API_URL.register, model);
  }

  public resendConfirmationEmail(email: string): Observable<IResponse<void>> {
    return this.post(REGISTER_API_URL.resendConfirmationEmail(email), null);
  }


  public edit(model: IUserEdit): Observable<IResponse<IUserManipulation | void>> {
    return this.put(REGISTER_API_URL.edit, model);
  }

  public usersByPageSizeAndPage(size: number, page: number): Observable<IResponse<IUserManipulation[] | void>> {
    return this.retrieve(REGISTER_API_URL.usersByPageSizeAndPage(size, page));
  }

  public userForEdit(id: number): Observable<IResponse<IUserManipulation | void>> {
    return this.retrieve(REGISTER_API_URL.userForEdit(id));
  }

}
