interface INatureItemUpdate {
  name: string;
  className: string;
  subInfo: string;
  languageID: number;
  vulnerabilityID?: number;
  natureInfos: INatureInfoUpdate[];
}
