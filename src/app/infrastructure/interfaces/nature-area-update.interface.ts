interface INatureAreaUpdate {
  id: number;
  natureCategoryID: number;
  stateID: number;
  natureAreas: INatureAreaItemUpdate[];
  natureAreaCreateImages: IUploadedFileCreate[];
  natureAreaUpdateImages: IUploadedFileUpdate[];
  natureAreaLocations: INatureAreaLocationUpdate[];
  areaCenter: IAreaCenterUpdateLocation;
}
