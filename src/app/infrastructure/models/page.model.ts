export class PageModel implements IPage {
  public number: number;
  public size: number;

  constructor(src: IPage) {
    this.number = src && src.number || 1;
    this.size = src && src.size || 10;
  }

  set(first: number, rows: number) {
    this.number = first / rows + 1;
    this.size = rows;
  }

}


