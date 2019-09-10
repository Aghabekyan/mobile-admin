export class NatureCategoryCreate implements INatureCategoryCreate {
  public name: string;
  public natureType: number;
  public languageID: number;

  constructor(src: INatureCategoryCreate) {
    this.name = src.name || '';
    this.languageID = src.languageID || 0;
    this.natureType = src.natureType || 0;
  }
}
