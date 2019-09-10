class GeneralInfoApiUrl {
  constructor() {
  }

  public allStatesByLanguageId(id: number) {
    return `/api/generalInfo/allStatesByLanguageId/${id}`;
  }

  public get naturesFeedbacks() {
    return `/api/generalInfo/naturesFeedbacks`;
  }
}

export const GENERAL_INFO_API_URL = new GeneralInfoApiUrl();

