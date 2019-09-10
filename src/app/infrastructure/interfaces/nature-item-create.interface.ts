interface INatureItemCreate {
  name: string;
  className: string;
  subInfo: string;
  languageID: number;
  vulnerabilityID?: number;
  natureInfos: INatureInfoCreate[];
}
