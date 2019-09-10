export class NatureGet implements INatureGet {
  public id: number;
  public name: string;
  public className: string;
  public subInfo: string;
  public isTop: boolean;
  public states: Array<string>;

  constructor(src: INatureGet) {
    this.id = src.id || 0;
    this.name = src.name || '';
    this.className = src.className || '';
    this.subInfo = src.subInfo || '';
    this.isTop = src.isTop || false;
    this.states = src.states || [];
  }
}
