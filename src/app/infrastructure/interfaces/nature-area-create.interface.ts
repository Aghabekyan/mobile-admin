interface INatureAreaCreate {
  isTop: boolean;
  natureCategoryID: number;
  stateID: number;
  natureAreas: INatureAreaItemCreate[];
  natureAreaImages: IUploadedFileCreate[];
  natureAreaLocations: INatureAreaLocationCreate[];
  areaCenter: IAreaCenterCreateLocation;
}
