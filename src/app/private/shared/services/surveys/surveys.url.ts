class SurveysApiUrl {
  constructor() {
  }


  public surveyQuestionsBySurveyIdAndLanguageId(surveyId: number, id: number) {
    return `/api/survey/surveyQuestionsBySurveyIdAndLanguageId/${surveyId}/${id}`;
  }

  public questionAnswersByQuestionIdAndLanguageId(questionId: number, id: number) {
    return `/api/survey/questionAnswersByQuestionIdAndLanguageId/${questionId}/${id}`;
  }

  public surveysByLanguageIdSizeAndPage(id: number, size: number, page: number) {
    return `/api/survey/surveysByLanguageIdSizeAndPage/${id}/${size}/${page}`;
  }

  public surveysById(id: number) {
    return `/api/survey/surveysById/${id}`;
  }

  public createSurveys(id: number) {
    return `/api/survey/createSurveys/${id}`;
  }

  public updateSurveys(id: number) {
    return `/api/survey/updateSurveys/${id}`;
  }

  public activateOrDeactivateSurvey(id: number, isActive: boolean) {
    return `/api/survey/activateOrDeactivateSurvey/${id}/${isActive}`;
  }
}

export const SURVEYS_API_URL = new SurveysApiUrl();

