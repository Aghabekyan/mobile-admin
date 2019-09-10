export class RegistrationModel implements IRegister {
  public id: number;
  public typeID: number;
  public statusID: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public confirmPassword: string;

  constructor(src: IRegister) {
    this.id = src.id || 0;
    this.typeID = src.typeID || 0;
    this.statusID = src.statusID || 0;
    this.email = src.email || '';
    this.password = src.password || '';
    this.confirmPassword = src.confirmPassword || '';
    this.firstName = src.firstName || '';
    this.lastName = src.lastName || '';
  }
}
