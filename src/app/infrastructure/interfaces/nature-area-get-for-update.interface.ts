interface INatureAreaGetForUpdate {
  id: number;
  isTop: boolean;
  natureCategoryID: number;
  stateID: number;
  natureAreas: INatureAreaItem[];
  natureAreaImages: IUploadedFile[];
  natureAreaLocations: INatureAreaLocation[];
  areaCenter: IAreaCenterLocation;
}
