import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {FileRestService, RestService} from '../../../../core/services/rest/index';
import {SURVEYS_API_URL} from './file.url';
import {HttpHeaders} from '../../../../../../node_modules/@angular/common/http';

@Injectable()
export class FileService extends FileRestService {

  public getHostingUrl(url) {
    return `${environment.userHostingUrl + url}`;
  }

  public exportExcelBySurveyId(id: number): Observable<IResponse<File | void>> {
    return this.retrieve(SURVEYS_API_URL.exportExcelBySurveyId(id));
  }

}
