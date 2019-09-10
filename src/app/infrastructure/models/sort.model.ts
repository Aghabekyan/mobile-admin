export class SortModel implements ISort {
  public field: string;
  public order: number;

  constructor(src: ISort) {
    this.field = src && src.field || '';
    this.order = src && src.order || 1;
  }

  set(field: string, order: number) {
    this.field = field;
    this.order = order;
  }
}
