interface INatureAreaItemUpdate {
  name: string;
  subInfo: string;
  languageID: number;
  vulnerabilityID?: number;
  natureAreaInfos: INatureAreaInfoUpdate[];
}
