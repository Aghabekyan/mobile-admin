export class NatureItem implements  INatureItem{
  name: string;
  className: string;
  subInfo: string;
  languageID: number;
  vulnerabilityID?: number;
  natureInfos: INatureInfo[];

  constructor(src: INatureItem) {
    this.name = src.name || '';
    this.className = src.className || '';
    this.subInfo = src.subInfo || '';
    this.languageID = src.languageID || 0;
    this.vulnerabilityID = src.vulnerabilityID || null;
    this.natureInfos = src.natureInfos || [];
  }
}
