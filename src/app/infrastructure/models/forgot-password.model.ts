export class ForgotPasswordModel implements IForgotPassword {
  public email: string;

  constructor(src: IForgotPassword) {
    this.email = src.email || '';
  }
}
