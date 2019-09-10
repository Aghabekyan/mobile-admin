class SetPasswordApiUrl {
  constructor() { }

  public get validateCode() {
    return '/api/user/validateCode';
  }

  public get getUserByID() {
    return '/api/user/';
  }

  public get resetPassword() {
    return '/api/user/resetPassword';
  }
}

export const SET_PASSWORD_API_URL = new SetPasswordApiUrl();
