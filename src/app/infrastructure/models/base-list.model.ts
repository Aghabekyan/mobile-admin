export class BaseListModel<T> implements IBaseList<T> {
  public list: Array<T> = [];
  public totalCount: number;

  constructor(src: Array<T> = [], totalRecords?: number) {
    this.list = src || [];
    this.totalCount = totalRecords || 0;
  }
}
