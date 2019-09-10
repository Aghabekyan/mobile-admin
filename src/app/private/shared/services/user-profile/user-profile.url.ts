class UserProfileApiUrl {
  constructor() { }

  public get update() {
    return '/api/user/update';
  }

  public get changePassword() {
    return '/api/user/changePassword';
  }

}

export const USER_PROFILE_API_URL = new UserProfileApiUrl();

