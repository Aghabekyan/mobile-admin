export class NatureLocation implements INatureLocation {
  id: number;
  lng: number;
  lat: number;
  isActive: boolean;
  stateID: number;

  constructor(src: INatureLocation) {
    this.id = src.id || 0;
    this.lng = src.lng || 0;
    this.lat = src.lat || 0;
    this.isActive = src.isActive || false;
    this.stateID = src.stateID || 0;
  }
}
