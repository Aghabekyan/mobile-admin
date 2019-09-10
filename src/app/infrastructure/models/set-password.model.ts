export class SetPasswordModel implements ISetPassword {
  public email: string;
  public password: string;
  public confirmPassword: string;
  public code: string;

  constructor(src: ISetPassword) {
    this.email = src.email || '';
    this.password = src.password || '';
    this.confirmPassword = src.confirmPassword || '';
    this.code = src.code || null;
  }
}
