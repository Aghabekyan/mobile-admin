import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';

import {Validators, FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';

import {MenuItem} from 'primeng/api';
import {
  AreasService,
  GeneralInfoService
} from '../shared/services/index';
import {MapComponent} from '../shared/components/map/index';
import {ITreeNode} from '../../infrastructure/interfaces/tree-node.interface';
import {LanguageEnum} from '../../infrastructure/enums/index';
import {appSettings} from '../../app.settings';
import {environment} from '../../../environments/environment';
import {enumToString} from '../../infrastructure/utils/index';
import {MessageType} from '../../infrastructure/enums';


@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  @ViewChild(MapComponent) child: MapComponent;

  public languageEnum = LanguageEnum;

  updateAreas: any = [];

  tab = 'armenian';
  mapMode = 'polygon';
  isUpdate = false;
  categoryDisplay = false;
  popupDisplay = false;
  submitted = false;
  invalidFormDisplay = false;
  loader = true;
  popupSaveLoader = false;
  collectedCategories = {};

  natureCategories: ITreeNode[];

  rowsCounts = [
    {label: '10', value: 10},
    {label: '20', value: 20},
    {label: '50', value: 50}
  ];
  rowsCount = this.rowsCounts[0].value;

  map_areas = [];
  selected_map_area = null;
  areas_count = 0;
  areasForm: FormGroup;

  editable_item: any;

  states: IDropdown[] = [];

  areas: INatureAreaGet[];

  imageEnvironmentUrl = '';

  tableCols: any[] = [
    {field: 'name', header: 'Անվանում'},
    {field: 'natureCategoryName', header: 'Կատեգորիա'},
    {field: 'stateName', header: 'Մարզ'},
    {field: 'action', header: ''},
  ];


  languages: any[] = [
    {id: 2, name: 'Հայերեն', flag: 'arm.png'},
    {id: 1, name: 'English', flag: 'eng.png'},
  ];
  selectedLanguage: any = this.languages[0];

  items: MenuItem[] = [
    {label: 'Armenian'},
    {label: 'English'},
    {label: 'Map'},
    {label: 'Images'}
  ];
  activeItem = this.items[1];


  constructor(private areasService: AreasService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private generalInfoService: GeneralInfoService,
              private fb: FormBuilder) {
    this.imageEnvironmentUrl = `${environment.userHostingUrl + appSettings.IMAGE_SOURCE}`;
  }

  ngOnInit() {
    this.naturesByLanguageIdPageSizeAndPage(this.selectedLanguage.id, appSettings.NATURE_ITEMS_GET_COUNT, appSettings.NATURE_ITEMS_GET_PAGE);
    this.getCategoriesByLanguageId(this.selectedLanguage.id);
    this.allStatesByLanguageId(this.selectedLanguage.id);
  }

  showCategoryDialog() {
    this.categoryDisplay = true;
  }


  getCategoriesByLanguageId(id: number) {
    this.areasService.allCategoriesByLanguageId(id).subscribe((res: IResponse<ITreeNode[]>) => {

        if (res) {
          if (res.success) {
            this.natureCategories = res.data;
            this.collectCategoryNames(this.natureCategories);

          } else {
            this.natureCategories = [];
          }
        }
      }
    );
  }

  naturesByLanguageIdPageSizeAndPage(id: number, size: number, page: number) {
    this.areasService.natureAreasByLanguageIdPageSizeAndPage(id, size, page).subscribe((res: IResponse<INatureAreaGet[]>) => {
      if (res) {
        if (res.success) {
          this.areas = res.data;
          this.loader = false;
        } else {
        }
      }
    });
  }

  // FORM START

  initForm() {
    const form = this.fb.group({
      natureCategoryID: [null, [Validators.required]],
      stateID: [null, [Validators.required]],
      areaCenter: [null],
      natureAreas: this.fb.array([]),
      natureAreaLocations: this.fb.array([])
    });

    if (this.isUpdate) {
      form.addControl('id', new FormControl(0));
      form.addControl('natureAreaImages', this.fb.group({}));
      const images = form.get('natureAreaImages') as FormGroup;
      images.addControl('natureAreaUpdateImages', this.fb.array([]));
      images.addControl('natureAreaCreateImages', this.fb.array([]));
    } else {
      form.addControl('natureAreaImages', this.fb.array([]));
    }

    this.areasForm = form;
  }


  createArea(languageID = 0): FormGroup {
    return this.fb.group({
      languageID: new FormControl(languageID),
      name: new FormControl('', [Validators.required]),
      subInfo: new FormControl(''),
      natureAreaInfos: this.fb.array([])
    });
  }

  createInfo(): FormGroup {
    const form = this.fb.group({
      key: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
    });

    if (this.isUpdate) {
      form.addControl('id', new FormControl(0));
      form.addControl('isActive', new FormControl(true));
    }

    return form;
  }

  createNewImage(file): FormGroup {
    return this.fb.group({
      image: new FormControl(file),
      copyrights: this.fb.array([
        this.createCopyright(LanguageEnum.am),
        this.createCopyright(LanguageEnum.en)
      ]),
    });
  }

  createImage(id = 0, isActive = null, path = null, uploadedFileID = 0): FormGroup {
    const form = this.fb.group({
      path: new FormControl(path, [Validators.required]),
      uploadedFileID: new FormControl(uploadedFileID, [Validators.required]),
      copyrights: this.fb.array([]),
    });

    if (this.isUpdate) {
      form.addControl('id', new FormControl(id));
      form.addControl('isActive', new FormControl(true));
    }

    return form;
  }

  createLocations(): FormGroup {
    const form = this.fb.group({
      areaLocations: this.fb.array([])
    });

    if (this.isUpdate) {
      form.addControl('id', new FormControl(0));
      form.addControl('isActive', new FormControl(true));
    }

    return form;
  }

  createLocation(lat = 0, lng = 0, id = 0): FormGroup {
    const form = this.fb.group({
      id: new FormControl(id, [Validators.required]),
      lat: new FormControl(lat, [Validators.required]),
      lng: new FormControl(lng, [Validators.required])
    });

    return form;
  }

  createCopyright(languageID = 0, id = 0, imageCopyright = null): FormGroup {
    const form = this.fb.group({
      imageCopyright: new FormControl(imageCopyright, [Validators.required]),
      languageID: new FormControl(languageID, [Validators.required])
    });

    if (this.isUpdate) {
      form.addControl('id', new FormControl(id));
    }

    return form;
  }


  // FORM END

  allStatesByLanguageId(id: number) {
    this.generalInfoService.allStatesByLanguageId(id).subscribe((res: IResponse<IDropdown[]>) => {
      if (res) {
        if (res.success) {
          this.states.push({value: null, label: 'Ընտրել մարզ'});
          res.data.forEach(x => {
            this.states.push(x);
          });
        } else {
        }
      }
    });
  }

  expandeNode(root, id) {
    const self = this;
    root.forEach(function (node) {
      if (node['data']['id'] === id) {
        node.expanded = true;
        self.expandeNode(self.natureCategories, node.data.parentCategoryID);
      }
      if (node['children'] !== []) {
        self.expandeNode(node['children'], id);
      }
    });
  }

  clickEditItem(natureAreaId: number) {
    this.areasService.natureAreasById(natureAreaId).subscribe(
      (res: IResponse<INatureAreaGetForUpdate>) => {
        if (res) {
          if (res.success) {
            this.editable_item = res;
            res.data.natureAreaLocations.filter(item => {
              this.updateAreas.push(item.areaLocations);
            });
            this.areas_count = res.data.natureAreaLocations.length;
            this.isUpdate = true;
            this.expandeNode(this.natureCategories, res.data.natureCategoryID);
            this.initForm();
            res.data.natureAreas.filter(natureArea => {
              const areas = this.areasForm.get('natureAreas') as FormArray;
              const area = this.createArea(natureArea.languageID);
              areas.push(area);

              natureArea.natureAreaInfos.filter(() => {
                const natureAreaInfos = area.get('natureAreaInfos') as FormArray;
                natureAreaInfos.push(this.createInfo());
              });
            });
            res.data.natureAreaImages.filter(image => {
              const natureAreaImages = this.areasForm.get('natureAreaImages') as FormGroup;
              const natureAreaUpdateImages = natureAreaImages.get('natureAreaUpdateImages') as FormArray;
              const imageCreate = this.createImage(image.id, image.isActive, image.path, image.uploadedFileID);
              natureAreaUpdateImages.push(imageCreate);
              image.copyrights.filter(copyright => {
                const copyrights = imageCreate.get('copyrights') as FormArray;
                copyrights.push(this.createCopyright(copyright.languageID, copyright.id, copyright.imageCopyright));
              });
            });
            res.data.natureAreaLocations.filter(natureAreaLocation => {
              const natureAreaLocations = this.areasForm.get('natureAreaLocations') as FormArray;
              const _areaLocations = this.createLocations();
              natureAreaLocations.push(_areaLocations);
              natureAreaLocation.areaLocations.filter(areaLocation => {
                const areaLocations = _areaLocations.get('areaLocations') as FormArray;
                areaLocations.push(this.createLocation(areaLocation.lat, areaLocation.lng, areaLocation.id));
              });
            });

            if (res.data.areaCenter !== null) {
              let areaCenter = this.areasForm.get('areaCenter') as FormGroup;
              areaCenter = this.fb.group({
                id: new FormControl(res.data.areaCenter.id, [Validators.required]),
                lat: new FormControl(res.data.areaCenter.lat, [Validators.required]),
                lng: new FormControl(res.data.areaCenter.lng, [Validators.required]),
                isActive: new FormControl(res.data.areaCenter.isActive, [Validators.required])
              });
            }
            this.areasForm.patchValue(<any>res.data);
            this.popupDisplay = true;
          } else {
            this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
          }
        }
      }
    );
  }


  // INFO START

  addInfo(formGroup) {
    const infos = formGroup.get('natureAreaInfos') as FormArray;
    infos.push(this.createInfo());
  }


  deleteInfo(info, index) {
    this.confirmationService.confirm({
      message: `Վստա՞հ եք, որ ցանկանում եք հեռացնել այս ինֆորմացիան։`,
      accept: () => {
        if (info.value.id) {
          info.patchValue({isActive: false});
        } else {
          info.parent.removeAt(index);
        }
      },
      reject: () => {
        return false;
      }
    });
  }


  deleteImage(image, index) {
    this.confirmationService.confirm({
      message: `Վստա՞հ եք, որ ցանկանում եք հեռացնել այս նկարը։`,
      accept: () => {
        if (image.value.id) {
          image.patchValue({isActive: false});
        } else {
          image.parent.removeAt(index);
        }
      },
      reject: () => {
        return false;
      }
    });
  }

  // INFO END

  // MAP START

  addShapeEventListener(event) {
    this.map_areas.push(event);

    if (this.map_areas.length > this.areas_count) {
      const natureAreaLocations = this.areasForm.get('natureAreaLocations') as FormArray;
      const _areaLocations = this.createLocations();
      natureAreaLocations.push(_areaLocations);
      event.getPath().getArray().filter(item => {
        const locations = _areaLocations.get('areaLocations') as FormArray;
        locations.push(this.createLocation(item.lat(), item.lng()));
      });
      this.areasForm.markAsDirty();
    }
  }

  deleteShapeEventListener(event) {
    const deleted_shape = event;
    const natureAreaLocations = this.areasForm.get('natureAreaLocations') as FormArray;
    const index = this.map_areas.indexOf(deleted_shape);
    if (natureAreaLocations.controls[index].value.id) {
      natureAreaLocations.controls[index].patchValue({isActive: false});
      this.map_areas[index] = null;
    } else {
      natureAreaLocations.removeAt(index);
      this.map_areas.splice(index, 1);
    }
    this.areas_count = this.areas_count - 1;
    this.areasForm.markAsDirty();
  }


  // MAP END

  // HELPERS START


  getFormByLang(form, control_name, lang_id) {
    return form['controls'][control_name]['controls'].filter(obj => obj.value.languageID === lang_id)[0];
  }


  // HELPERS END

  calculateAreasCenter() {
    let areaCenter = this.areasForm.get('areaCenter') as FormGroup;

    const countOfAreas = this.map_areas.filter(x => x).length;

    if (!this.map_areas || this.map_areas.length === 0 || countOfAreas === 0) {
      if (areaCenter.value) {
        areaCenter.patchValue({'id': areaCenter.value.id, 'isActive': false});
      }
      return null;
    }

    const points = [];
    const center = {'lat': 0.0, 'lng': 0.0};

    this.map_areas.filter(map_area => {
      if (map_area !== null) {
        map_area.getPath().getArray().filter(lng_lat => {
          points.push({'lat': lng_lat.lat(), 'lng': lng_lat.lng()});
        });
      }
    });

    for (let i = 0; i < points.length; i++) {
      center['lat'] += points[i].lat;
      center['lng'] += points[i].lng;
    }

    const totalPoints = points.length;
    center['lat'] = center['lat'] / totalPoints;
    center['lng'] = center['lng'] / totalPoints;

    if (areaCenter !== null) {
      if (center['lat'] && center['lng']) {
        if (areaCenter.value && areaCenter.value.id) {
          areaCenter.patchValue({'id': areaCenter.value.id, 'lat': center['lat'], 'lng': center['lng'], 'isActive': true});
        } else {
          areaCenter.patchValue({'lat': center['lat'], 'lng': center['lng'], 'isActive': true});
        }
      } else {
        areaCenter.patchValue({'id': areaCenter.value.id, 'isActive': false});
      }
    } else {
      areaCenter = this.fb.group({
        lat: new FormControl(center['lat'], [Validators.required]),
        lng: new FormControl(center['lng'], [Validators.required]),
        isActive: new FormControl(true, [Validators.required])
      });
    }


  }


  save() {
    this.submitted = true;
    this.popupSaveLoader = true;
    if (this.areasForm.invalid) {
      this.invalidFormDisplay = true;
      this.popupSaveLoader = false;
      return;
    }
    this.calculateAreasCenter();

    if (this.isUpdate) {
      this.areasService.updateNatureAreas(this.selectedLanguage.id, this.areasForm.value).subscribe((res: IResponse<INatureAreaGet>) => {
        if (res) {
          if (res.success) {
            const nature = this.areas.filter(x => x.id === res.data.id)[0];
            const natureIndex = this.areas.indexOf(nature);
            this.areas[natureIndex] = res.data;
            this.popupDisplay = false;
            this.resetForm();
            this.messageService.add({severity: enumToString(MessageType, MessageType.success), detail: res.message});
            this.popupSaveLoader = false;
          } else {
            this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
            this.popupSaveLoader = false;
          }
        }
      });
      //  service connection for updating
    } else {
      this.areasService.createNatureAreas(this.selectedLanguage.id, this.areasForm.value).subscribe((res: IResponse<INatureAreaGet>) => {
        if (res) {
          if (res.success) {
            this.areas.unshift(res.data);
            this.popupDisplay = false;
            this.resetForm();
            this.messageService.add({severity: enumToString(MessageType, MessageType.success), detail: res.message});
            this.popupSaveLoader = false;
          } else {
            this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
            this.popupSaveLoader = false;
          }
        }
      });
      //  service connection for creating
    }

    this.submitted = false;
    this.invalidFormDisplay = false;
  }


  cancel() {
    this.popupSaveLoader = false;
    if (this.areasForm.dirty) {
      this.confirmationService.confirm({
        message: `Վստա՞հ եք, որ ցանկանում եք չեղարկել։ Ձեր կատարած փոփոխությունները չեն պահպանվելու։`,
        accept: () => {
          this.resetForm();
          this.popupDisplay = false;
          this.submitted = false;
        },
        reject: () => {
          return false;
        }
      });
    } else {
      this.resetForm();
      this.popupDisplay = false;
      this.submitted = false;
    }
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: `<strong>Վստա՞հ եք, որ ցանկանում եք հեռացնել այս տարածքը։</strong>`,
      accept: () => {
        this.areasService.deleteNatureAreasById(id).subscribe((res: IResponse<void>) => {
          if (res) {
            if (res.success) {
              const nature = this.areas.filter(x => x.id === id)[0];
              const natureIndex = this.areas.indexOf(nature);
              this.areas.splice(natureIndex, 1);
              this.messageService.add({severity: enumToString(MessageType, MessageType.success), detail: res.message});
            } else {
              this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
            }
          }
        });
      },
      reject: () => {
        return false;
      }
    });
  }

  resetForm() {
    this.areasForm.reset();
    this.map_areas = [];
    this.updateAreas = [];
    this.areas_count = 0;
  }

  addArea() {
    this.isUpdate = false;
    this.initForm();
    const areas = this.areasForm.get('natureAreas') as FormArray;
    areas.push(this.createArea(LanguageEnum.am));
    areas.push(this.createArea(LanguageEnum.en));
    this.popupDisplay = true;
  }


  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  public onUpload(event) {
    for (const file of event.files) {
      if (!appSettings.IMAGE_TYPES.includes(file.type)) {
        return false;
      }
      if (file.size > 5000000) {
        return false;
      }
      this.getBase64(file).then(
        data => {
          if (this.isUpdate) {
            const natureAreaImages = this.areasForm.get('natureAreaImages') as FormGroup;
            const new_images = natureAreaImages.get('natureAreaCreateImages') as FormArray;
            const new_image = this.createNewImage(data);
            new_images.push(new_image);
          } else {
            const natureAreaImages = this.areasForm.get('natureAreaImages') as FormArray;
            const new_image = this.createNewImage(data);
            natureAreaImages.push(new_image);
          }
        });
    }
  }

  onLanguageChange() {
    this.loader = true;
    this.naturesByLanguageIdPageSizeAndPage(this.selectedLanguage.id, appSettings.NATURE_ITEMS_GET_COUNT, appSettings.NATURE_ITEMS_GET_PAGE);
    this.getCategoriesByLanguageId(this.selectedLanguage.id);
    this.allStatesByLanguageId(this.selectedLanguage.id);
  }

  changePaginationCount(event) {
    this.rowsCount = event.value;
  }

  collectCategoryNames(root) {
    const self = this;
    root.forEach(function (node) {
      if (node['children'] !== []) {
        self.collectedCategories[node.data.id] = node.data.name;
        self.collectCategoryNames(node['children']);
      } else {
        return;
      }
    });
  }

  clickExpandNode(event, rowNode) {
    rowNode.node.expanded = !rowNode.node.expanded;
    this.natureCategories = [...this.natureCategories];
    if (!rowNode.node.children || rowNode.node.children.length === 0) {
      this.areasForm.get('natureCategoryID').patchValue( rowNode.node.data.id);
    }
  }
}
