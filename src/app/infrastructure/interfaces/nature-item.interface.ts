interface INatureItem {
  name: string;
  className: string;
  subInfo: string;
  languageID: number;
  vulnerabilityID?: number;
  natureInfos: INatureInfo[];
}
