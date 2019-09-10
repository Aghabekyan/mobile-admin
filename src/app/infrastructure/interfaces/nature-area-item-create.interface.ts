interface INatureAreaItemCreate {
  name: string;
  subInfo: string;
  languageID: number;
  vulnerabilityID?: number;
  natureAreaInfos: INatureAreaInfoCreate[];
}
