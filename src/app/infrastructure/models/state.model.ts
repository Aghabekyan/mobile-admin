export class State implements IDropdown {
  public value: number;
  public label: string;

  constructor(src: IDropdown) {
    this.value = src.value || 0;
    this.label = src.label || '';
  }
}
