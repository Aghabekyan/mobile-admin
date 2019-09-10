export class ConfirmEmail implements IConfirmEmail {
  public userId: number;
  public code: string;
  constructor(src: IConfirmEmail) {
    this.userId = src.userId || 0;
    this.code = src.code || '';
  }
}
