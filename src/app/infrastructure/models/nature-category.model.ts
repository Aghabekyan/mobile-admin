export class NatureCategory implements INatureCategory {
  public id: number;
  public name: string;
  public natureType: number;
  public languageID: number;

  constructor(src: INatureCategory) {
    this.id = src.id || 0;
    this.name = src.name || '';
    this.natureType = src.natureType || 0;
    this.languageID = src.languageID || 0;
  }
}
