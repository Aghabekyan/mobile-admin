import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {RestService} from '../../../../core/services/rest/index';
import {GENERAL_INFO_API_URL} from './general-info.url';

@Injectable()
export class GeneralInfoService extends RestService {

  public getHostingUrl(url) {
    return `${environment.userHostingUrl + url}`;
  }

  public allStatesByLanguageId(id: number): Observable<IResponse<IDropdown[] | void>> {
    return this.retrieve(GENERAL_INFO_API_URL.allStatesByLanguageId(id));
  }

  public naturesFeedbacks(): Observable<IResponse<INatureFeedback[] | void>> {
    return this.retrieve(GENERAL_INFO_API_URL.naturesFeedbacks);
  }

}

