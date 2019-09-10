import { Component, AfterViewInit, Output, Input, EventEmitter } from '@angular/core';
import { MapLoaderService } from './map.loader';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

declare const google: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  map: any;
  drawingManager: any;
  selectedShape: any;
  selectedArea: any;
  allShapes = [];
  allAreas = [];
  statesPolygons = [];
  ARMENIA_BOUNDS = {
    north: 41.53325414,
    south: 38.43993322,
    west: 43.37402344,
    east: 47.32910156,
  };

  @Output() selectedShapeEvent = new EventEmitter<Object>();
  @Output() addShapeEvent = new EventEmitter<Object>();
  @Output() deleteShapeEvent = new EventEmitter<Object>();
  @Output() dragShapeEvent = new EventEmitter<Object>();

  @Input() updateShapes;
  @Input() updateAreas;
  @Input() mode;

  constructor(
    private http: HttpClient,
    private confirmationService: ConfirmationService) {

  }

  public allStatesPolygons() {
    return this.http.get('./assets/states_polygons.json');
  }

  calculateStateOfPoint(point) {
    const pointObj = new google.maps.LatLng(point.getPosition().lat(), point.getPosition().lng());

    let stateID = null;

    this.statesPolygons.filter(item => {
      const statePolygon = new google.maps.Polygon({ paths: item['geometry']['coordinates'] });
      if (google.maps.geometry.poly.containsLocation(pointObj, statePolygon)) {
        stateID = item['properties']['id'];
      }
    });

    return stateID;

  }

  createAreaClickListener(area) {
    google.maps.event.addListener(area, 'click', () => {
      this.allAreas.filter(shape => shape.setOptions({ fillOpacity: 0.6, fillColor: 'black' }));
      area.setOptions({ fillOpacity: 0.6, fillColor: 'red' });
      this.selectedShapeEvent.emit(area);
      this.selectedArea = area;
    });
  }

  ngAfterViewInit() {
    this.allStatesPolygons().subscribe(data => {
      this.statesPolygons = data['features'];
      MapLoaderService.load().then(() => {
        this.drawPolygon();
        if (this.mode === 'marker') {
          this.updateShapes.filter(item => {
            const newShape = new google.maps.Marker({
              position: new google.maps.LatLng(item.lat, item.lng),
              map: this.map,
              draggable: true
            });

            google.maps.event.addListener(newShape, 'click', () => {
              this.selectedShape = newShape;
              this.allShapes.filter(shape => shape.setIcon());
              this.selectedShape.setIcon('http://maps.google.com/mapfiles/ms/micons/blue.png');
              this.selectedShapeEvent.emit(this.selectedShape);
            });
            google.maps.event.addListener(newShape, 'dragend', () => {
              this.dragShapeEvent.emit(newShape);
            });
            this.addShapeEvent.emit(newShape);
            this.allShapes.push(newShape);
          });
        }

        if (this.mode === 'polygon') {
          this.updateAreas.filter(item => {
            const newArea = new google.maps.Polygon({
              paths: item,
              map: this.map,
              fillColor: 'black',
              fillOpacity: 0.6
            });
            this.createAreaClickListener(newArea);

            this.addShapeEvent.emit(newArea);
            this.allAreas.push(newArea);
          });
        }
      });
    });
  }

  getShapeCoords(shape) {
    const path = shape.getPath();
    const coords = [];
    for (let i = 0; i < path.length; i++) {
      coords.push({
        latitude: path.getAt(i).lat(),
        longitude: path.getAt(i).lng()
      });
    }
    return coords;
  }

  getMarkerCoords(marker) {
    return {
      latitude: marker.getPosition().lat(),
      longitude: marker.getPosition().lng()
    };
  }


  clickMarker(shape) {
    google.maps.event.trigger(shape, 'click');
  }

  deleteSelectedMarker() {
    this.confirmationService.confirm({
      message: `Վստա՞հ եք, որ ցանկանում եք հեռացնել այս կետը։`,
      accept: () => {
        if (!this.selectedShape) {
          return;
        }
        const index = this.allShapes.indexOf(this.selectedShape);
        this.allShapes.splice(index, 1);
        this.selectedShape.setMap(null);
        this.deleteShapeEvent.emit(this.selectedShape);
        this.selectedShape = null;
      },
      reject: () => {
        return false;
      }
    });
  }


  deleteSelectedArea() {
    this.confirmationService.confirm({
      message: `Վստա՞հ եք, որ ցանկանում եք հեռացնել նշված տարածքը։`,
      accept: () => {
        if (!this.selectedArea) {
          // alert('There are no shape selected');
          return;
        }
        const index = this.allAreas.indexOf(this.selectedArea);
        this.allAreas.splice(index, 1);
        this.selectedArea.setMap(null);
        this.deleteShapeEvent.emit(this.selectedArea);
        this.selectedArea = null;
      },
      reject: () => {
        return false;
      }
    });
  }


  drawPolygon() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.195659093364654, lng: 44.736328125 },
      restriction: {
        latLngBounds: this.ARMENIA_BOUNDS,
        strictBounds: false,
      },
      zoom: 7
    });
    let control = document.getElementsByClassName("delete")[0]
    control['index'] = 1;
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control);

    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: this.mode === 'marker' ? google.maps.drawing.OverlayType.MARKER : google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [this.mode]
      },
      markerOptions: {
        // icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
        draggable: true
      },
      polygonOptions: {
        draggable: this.mode === 'marker' ? true : false,
        fillOpacity: 0.6,
        fillColor: 'black'
      }
    });

    this.drawingManager.setMap(this.map);
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
      /*Polygon drawn*/
      if (event.type === google.maps.drawing.OverlayType.POLYGON && this.mode === 'polygon') {
        /*this is the coordinate, you can assign it to a variable or pass into another function.*/
        const newShape = event.overlay;
        this.createAreaClickListener(newShape);
        this.selectedArea = newShape;
        this.allAreas.push(newShape);
        this.addShapeEvent.emit(newShape);
      }

      if (event.type === google.maps.drawing.OverlayType.MARKER && this.mode === 'marker') {
        /*this is the coordinate, you can assign it to a variable or pass into another function.*/
        const newShape = event.overlay;
        google.maps.event.addListener(newShape, 'click', (event1) => {
          this.selectedShape = newShape;
          this.allShapes.filter(shape => shape.setIcon());
          this.selectedShape.setIcon('http://maps.google.com/mapfiles/ms/micons/blue.png');
          this.selectedShapeEvent.emit(this.selectedShape);
        });
        google.maps.event.addListener(newShape, 'dragend', (event1) => {
          this.dragShapeEvent.emit(newShape);
        });

        this.addShapeEvent.emit(newShape);
        // pushing this shape to allShapes array
        this.allShapes.push(newShape);
      }
    });
  }
}
