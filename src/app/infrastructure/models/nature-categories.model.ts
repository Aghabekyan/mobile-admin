export class NatureCategories implements INatureCategories {
  public id: number;
  public name: string;
  public parentCategoryID?: number;
  public childrenCategories: INatureCategories[];

  constructor(src: INatureCategories) {
    this.id = src.id || 0;
    this.name = src.name || '';
    this.parentCategoryID = src.parentCategoryID || null;
    this.childrenCategories = src.childrenCategories || null;
  }
}
