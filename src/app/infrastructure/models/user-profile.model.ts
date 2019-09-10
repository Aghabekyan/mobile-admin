export class UserProfileModel implements IUserProfile {
  public id: number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public typeID: number;
  public password: string;
  public confirmPassword: string;
  constructor(src: IUserProfile) {
    this.id = src.id || 0;
    this.email = src.email || '';
    this.firstName = src.firstName || '';
    this.lastName = src.lastName || '';
    this.typeID = src.typeID || null;
    this.password = src.password || '';
    this.confirmPassword = src.confirmPassword || '';
  }
}
