export class Copyright implements ICopyright {
  public id: number;
  public languageID: number;
  public isActive: boolean;
  public imageCopyright: string;

  constructor(src: ICopyright) {
    this.id = src.id || 0;
    this.languageID = src.languageID || 0;
    this.isActive = src.isActive || false;
    this.imageCopyright = src.imageCopyright || '';
  }
}
