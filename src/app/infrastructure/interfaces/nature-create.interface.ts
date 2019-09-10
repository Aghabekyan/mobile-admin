interface INatureCreate {
  isTop: boolean;
  /*selectedLanguageID: number;*/
  natureCategoryID: number;
  natures: INatureItemCreate[];
  natureImages: IUploadedFileCreate[];
  natureLocations: INatureLocationCreate[];
}
