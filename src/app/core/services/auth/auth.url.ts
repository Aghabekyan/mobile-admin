class AuthApiUrl {
  constructor() {
  }

  public get login() {
    return '/connect/token';
  }

  public get current() {
    return '/api/user/current';
  }

  public get logOut() {
    return '/api/account/logout';
  }

}

export const AUTH_API_URL = new AuthApiUrl();
