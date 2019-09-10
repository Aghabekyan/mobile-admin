class UserApiUrl {
  constructor() {
  }

  public get register() {
    return `/api/user/register`;
  }

  public get edit() {
    return `/api/user/edit`;
  }

  public resendConfirmationEmail(email: string) {
    return `/api/user/resendConfirmationEmail/${email}`;
  }

  public usersByPageSizeAndPage(size: number, page: number) {
    return `/api/user/usersByPageSizeAndPage/${size}/${page}`;
  }

  public userForEdit(id: number) {
    return `/api/user/userForEdit/${id}`;
  }
}

export const REGISTER_API_URL = new UserApiUrl();
