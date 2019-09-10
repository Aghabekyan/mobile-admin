interface INatureUpdate {
  id: number;
  isTop: boolean;
  natureCategoryID: number;
  natures: INatureItemUpdate[];
  natureCreateImages: IUploadedFileCreate[];
  natureUpdateImages: IUploadedFileUpdate[];
  natureLocations: INatureLocationUpdate[];
}
