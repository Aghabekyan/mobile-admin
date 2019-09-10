class ForgotPasswordApiUrl {
  constructor() {
  }

  public get forgotPassword() {
    return '/api/user/forgotPassword';
  }

}

export const FORGOT_PASSWORD_API_URL = new ForgotPasswordApiUrl();
