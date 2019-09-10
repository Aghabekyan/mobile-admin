export class LoginModel implements ILogin {
  public email: string;
  public password: string;
  public rememberMe: boolean;

  constructor(src: ILogin) {
    this.email = src.email || '';
    this.password = src.password || null;
    this.rememberMe = src.rememberMe || false;
  }
}
