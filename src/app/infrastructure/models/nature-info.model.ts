export class NatureInfo implements INatureInfo {
  public id: number;
  public isActive: boolean;
  public key: string;
  public value: string;
  public languageID: number;

  constructor(src: INatureInfo) {
    this.id = src.id || 0;
    this.isActive = src.isActive || false;
    this.key = src.key || '';
    this.value = src.value || '';
    this.languageID = src.languageID || 0;
  }
}
