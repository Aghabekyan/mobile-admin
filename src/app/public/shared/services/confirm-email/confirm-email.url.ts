class ConfirmEmailApiUrl {
  constructor() { }

  public get confirmEmail() {
    return '/api/user/confirmEmail';
  }
}

export const CONFIRM_EMAIL_API_URL = new ConfirmEmailApiUrl();
