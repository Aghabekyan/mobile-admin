export class NatureGetForUpdate implements INatureGetForUpdate {
 public id: number;
 public isTop: boolean;
 public natureCategoryID: number;
 public natures: INatureItem[];
 public natureImages: IUploadedFile[];
 public natureLocations: INatureLocation[];

  constructor(src: INatureGetForUpdate ) {
    this.id = src.id || 0;
    this.isTop = src.isTop || false;
    this.natureCategoryID = src.natureCategoryID || 0;
    this.natures = src.natures || [];
    this.natureImages = src.natureImages || [];
    this.natureLocations = src.natureLocations || [];
  }
}
