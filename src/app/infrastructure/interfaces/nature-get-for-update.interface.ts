interface INatureGetForUpdate {
  id: number;
  isTop: boolean;
  natureCategoryID: number;
  natures: INatureItem[];
  natureImages: IUploadedFile[];
  natureLocations: INatureLocation[];
}
