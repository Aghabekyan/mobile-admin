export class NatureCategoryNode implements INatureCategoryNode {
  public id: number;
  public name: string;
  public natureType: number;
  public parentCategoryID?: number;

  constructor(id: number, name: string, natureType: number, parentCategoryID?: number) {
    this.id = id || 0;
    this.name = name || '';
    this.natureType = natureType || 0;
    this.parentCategoryID = parentCategoryID || null;
  }
}
