class SurveysApiUrl {
  constructor() {
  }

  public exportExcelBySurveyId(id: number) {
    return `/api/survey/exportExcelBySurveyId/${id}`;
  }
}

export const SURVEYS_API_URL = new SurveysApiUrl();

