export class NatureCategoryUpdate implements INatureCategoryUpdate {
  public id: number;
  public name: string;
  public languageID: number;

  constructor(src: INatureCategoryUpdate) {
    this.id = src.id || 0;
    this.name = src.name || '';
    this.languageID = src.languageID || 0;
  }
}
