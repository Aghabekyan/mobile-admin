import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {FileRestService, RestService} from '../../../../core/services/rest/index';
import {SURVEYS_API_URL} from './surveys.url';
import {HttpHeaders} from '../../../../../../node_modules/@angular/common/http';

@Injectable()
export class SurveysService extends RestService {

  public getHostingUrl(url) {
    return `${environment.userHostingUrl + url}`;
  }

  public surveyQuestionsBySurveyIdAndLanguageId(surveyId: number, id: number): Observable<IResponse<ISurveyQuestionGet | void>> {
    return this.retrieve(SURVEYS_API_URL.surveyQuestionsBySurveyIdAndLanguageId(surveyId, id));
  }

  public questionAnswersByQuestionIdAndLanguageId(questionId: number, id: number): Observable<IResponse<IQuestionAnswerGet[] | void>> {
    return this.retrieve(SURVEYS_API_URL.questionAnswersByQuestionIdAndLanguageId(questionId, id));
  }

  public surveysByLanguageIdSizeAndPage(id: number, size: number, page: number): Observable<IResponse<ISurveyGet[] | void>> {
    return this.retrieve(SURVEYS_API_URL.surveysByLanguageIdSizeAndPage(id, size, page));
  }

  public surveysById(id: number): Observable<IResponse<ISurveyGetForUpdate | void>> {
    return this.retrieve(SURVEYS_API_URL.surveysById(id));
  }

  public createSurveys(id: number, surveyCreate: ISurveyCreate): Observable<IResponse<ISurveyGet | void>> {
    return this.post(SURVEYS_API_URL.createSurveys(id), surveyCreate);
  }

  public updateSurveys(id: number, surveyUpdate: ISurveyUpdate): Observable<IResponse<ISurveyGet | void>> {
    return this.put(SURVEYS_API_URL.updateSurveys(id), surveyUpdate);
  }

  public activateOrDeactivateSurvey(id: number, isActive: boolean): Observable<IResponse<void>> {
    return this.put(SURVEYS_API_URL.activateOrDeactivateSurvey(id, isActive), null);
  }

}
