export class ValidateCodeModel implements IValidateCode {
  public userId: number;
  public code: string;

  constructor(src: IValidateCode) {
    this.userId = src.userId || 0;
    this.code = src.code || null;
  }
}
