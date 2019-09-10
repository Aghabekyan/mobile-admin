import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {
  NaturesService,
  GeneralInfoService
} from '../shared/services/index';
import { MapComponent } from '../shared/components/index';
import { ITreeNode } from '../../infrastructure/interfaces/tree-node.interface';
import { appSettings } from '../../app.settings';
import { LanguageEnum, MessageType } from '../../infrastructure/enums/index';
import { enumToString } from '../../infrastructure/utils/index';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-nature',
  templateUrl: './nature.component.html',
  styleUrls: ['./nature.component.scss']
})
export class NatureComponent implements OnInit {
  @ViewChild(MapComponent) child: MapComponent;

  public languageEnum = LanguageEnum;
  updateShapes: any = [];

  mapMode = 'marker';
  isUpdate = false;
  submitted = false;
  categoryDisplay = false;
  invalidFormDisplay = false;
  loader = true;
  popupSaveLoader = false;
  natureCategories: ITreeNode[];
  collectedCategories = {};
  natures: INatureGet[];

  map_items = [];
  selected_map_items = null;
  location_count = 0;
  naturesForm: FormGroup;

  editable_item: any;

  display = false;

  states: IDropdown[] = [];
  filterStates: IDropdown[] = [];


  imageEnvironmentUrl = '';

  tableCols: any[] = [
    { field: 'className', header: 'Դասի անվանում' },
    { field: 'name', header: 'Անվանում' },
    { field: 'subInfo', header: 'Ենթատող' },
    { field: 'action', header: '' },
  ];

  languages: any[] = [
    { id: 2, name: 'Հայերեն', flag: 'arm.png' },
    { id: 1, name: 'English', flag: 'eng.png' },
  ];

  rowsCounts = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 }
  ];

  filterTopValues = [
    { label: 'Բոլորը', value: null },
    { label: 'Հետաքրքիր տեսակները', value: true },
    { label: 'Մնացած տեսակները', value: false }
  ];

  rowsCount = this.rowsCounts[0].value;

  selectedLanguage: any = this.languages[0];

  constructor(private naturesService: NaturesService,
    private generalInfoService: GeneralInfoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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
    this.naturesService.allCategoriesByLanguageId(id).subscribe((res: IResponse<ITreeNode[]>) => {
      if (res) {
        if (res.success) {
          this.natureCategories = res.data;
          this.collectCategoryNames(this.natureCategories);
        } else {
        }
      }
    });
  }

  naturesByLanguageIdPageSizeAndPage(id: number, size: number, page: number) {
    this.naturesService.naturesByLanguageIdPageSizeAndPage(id, size, page).subscribe((res: IResponse<INatureGet[]>) => {
      if (res) {
        if (res.success) {
          this.natures = res.data;
          this.loader = false;
        } else {
        }
      }
    });
  }

  allStatesByLanguageId(id: number) {
    this.generalInfoService.allStatesByLanguageId(id).subscribe((res: IResponse<IDropdown[]>) => {
      if (res) {
        if (res.success) {
          this.states.push({ value: null, label: 'Ընտրել մարզ' });
          this.filterStates.push({ label: 'Բոլոր Մարզերը', value: null });
          res.data.forEach(x => {
            this.states.push(x);
            this.filterStates.push(x);
          });
        } else {
        }
      }
    });
  }


  initForm() {
    const form = this.fb.group({
      isTop: [false],
      natureCategoryID: [null, [Validators.required]],
      natures: this.fb.array([]),
      natureLocations: this.fb.array([])
    });

    if (this.isUpdate) {
      form.addControl('id', new FormControl(0));
      form.addControl('natureImages', this.fb.group({}));
      const images = form.get('natureImages') as FormGroup;
      images.addControl('natureUpdateImages', this.fb.array([]));
      images.addControl('natureCreateImages', this.fb.array([]));
    } else {
      form.addControl('natureImages', this.fb.array([]));
    }

    this.naturesForm = form;
  }

  createNature(languageID = null): FormGroup {
    return this.fb.group({
      languageID: new FormControl(languageID),
      name: new FormControl('', [Validators.required]),
      className: new FormControl(''),
      subInfo: new FormControl(''),
      natureInfos: this.fb.array([])
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

  createImage(id = null, isActive = null, path = null, uploadedFileID = null): FormGroup {
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

  createLocation(lat = null, lng = null, stateID = null): FormGroup {
    const form = this.fb.group({
      lat: new FormControl(lat, [Validators.required]),
      lng: new FormControl(lng, [Validators.required]),
      stateID: new FormControl(stateID, [Validators.required])
    });

    if (this.isUpdate) {
      form.addControl('id', new FormControl(0));
      form.addControl('isActive', new FormControl(true));
    }

    return form;
  }

  createCopyright(languageID = null, id = null, text = null): FormGroup {
    const form = this.fb.group({
      imageCopyright: new FormControl(text, [Validators.required]),
      languageID: new FormControl(languageID, [Validators.required])
    });

    if (this.isUpdate) {
      form.addControl('id', new FormControl(id));
    }

    return form;
  }

  expandNode(root, id) {
    const self = this;
    root.forEach(function (node) {
      if (node['data']['id'] === id) {
        node.expanded = true;
        self.expandNode(self.natureCategories, node.data.parentCategoryID);
      }
      if (node['children'] !== []) {
        self.expandNode(node['children'], id);
      }
    });
  }

  clickEditItem(id: number) {
    this.naturesService.naturesById(id).subscribe((res: IResponse<INatureGetForUpdate>) => {
      if (res) {
        if (res.success) {
          const data = res.data;
          this.editable_item = data;
          this.updateShapes = data.natureLocations;
          this.location_count = this.updateShapes.length;
          this.isUpdate = true;
          this.collapseNode(this.natureCategories);
          this.natureCategories = [...this.natureCategories];
          this.expandNode(this.natureCategories, data.natureCategoryID);
          this.initForm();
          data.natures.filter(nature => {
            const natures = this.naturesForm.get('natures') as FormArray;
            const createNatureItem = this.createNature();
            natures.push(createNatureItem);

            nature.natureInfos.filter(() => {
              const natureInfos = createNatureItem.get('natureInfos') as FormArray;
              natureInfos.push(this.createInfo());
            });
          });
          data.natureImages.filter(natureImage => {
            const natureImages = this.naturesForm.get('natureImages') as FormGroup;
            const natureUpdateImages = natureImages.get('natureUpdateImages') as FormArray;
            const image = this.createImage(natureImage.id, natureImage.isActive, natureImage.path, natureImage.uploadedFileID);
            natureUpdateImages.push(image);
            natureImage.copyrights.filter(copyright => {
              const copyrights = image.get('copyrights') as FormArray;
              copyrights.push(this.createCopyright(copyright.languageID, copyright.id, copyright.imageCopyright));
            });
          });
          data.natureLocations.filter(() => {
            const natureLocations = this.naturesForm.get('natureLocations') as FormArray;
            natureLocations.push(this.createLocation());
          });
          this.naturesForm.patchValue(<any>data);
          this.display = true;
        } else {
          this.messageService.add({ severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage });
        }
      }
    });
  }


  addInfo(formGroup) {
    const natureInfos = formGroup.get('natureInfos') as FormArray;
    natureInfos.push(this.createInfo());
  }

  deleteInfo(info, index) {
    this.confirmationService.confirm({
      message: `Վստա՞հ եք, որ ցանկանում եք հեռացնել այս իմֆորմացիան։`,
      accept: () => {
        if (info.value.id) {
          info.patchValue({ isActive: false });
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
          image.patchValue({ isActive: false });
        } else {
          image.parent.removeAt(index);
        }
      },
      reject: () => {
        return false;
      }
    });
  }


  addShapeEventListener(event) {

    this.map_items.push(event);

    if (this.map_items.length > this.location_count) {
      const stateID = this.child.calculateStateOfPoint(event);
      const locations = this.naturesForm.get('natureLocations') as FormArray;
      locations.push(this.createLocation(event.getPosition().lat(), event.getPosition().lng(), stateID));
      this.naturesForm.markAsDirty();
    }
  }

  dragShapeEventListener(event) {
    const index = this.map_items.indexOf(event);
    const natureLocations = this.naturesForm.get('natureLocations') as FormArray;
    const draggedLocation = natureLocations.controls[index];
    const stateID = this.child.calculateStateOfPoint(event);
    draggedLocation.patchValue({ lat: event.getPosition().lat(), lng: event.getPosition().lng(), stateID: stateID });
  }


  selectedShapeEventListener(event) {
    this.selected_map_items = event;
  }

  deleteShapeEventListener(event) {
    const deleted_shape = event;
    const natureLocations = this.naturesForm.get('natureLocations') as FormArray;
    const index = this.map_items.indexOf(deleted_shape);
    const deletedLocation = natureLocations.controls[index];
    this.naturesForm.markAsDirty();

    if (deletedLocation.value.id) {
      deletedLocation.patchValue({ isActive: false });
      this.map_items[index] = null;
    } else {
      natureLocations.removeAt(index);
      this.map_items.splice(index, 1);
    }
    this.location_count = this.location_count - 1;
  }

  clickState(item) {
    this.child.clickMarker(item);
  }

  getFormByLang(form, control_name, languageID: LanguageEnum) {
    return form['controls'][control_name]['controls'].filter(obj => obj.value.languageID === languageID)[0];
  }

  save() {
    this.submitted = true;
    this.popupSaveLoader = true;
    if (this.naturesForm.invalid) {
      this.invalidFormDisplay = true;
      this.popupSaveLoader = false;
      return;
    }

    if (this.isUpdate) {
      this.naturesService.updateNatures(this.selectedLanguage.id, this.naturesForm.value).subscribe((res: IResponse<INatureGet>) => {
        if (res) {
          if (res.success) {
            const nature = this.natures.filter(x => x.id === res.data.id)[0];
            const natureIndex = this.natures.indexOf(nature);
            this.natures[natureIndex] = res.data;
            this.natures = [...this.natures];
            this.display = false;
            this.resetForm();
            this.messageService.add({ severity: enumToString(MessageType, MessageType.success), detail: res.message });
            this.popupSaveLoader = false;
          } else {
            this.messageService.add({ severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage });
            this.popupSaveLoader = false;
          }
        }
      });
    } else {
      this.naturesService.createNatures(this.selectedLanguage.id, this.naturesForm.value).subscribe((res: IResponse<INatureGet>) => {
        if (res) {
          if (res.success) {
            this.natures.unshift(res.data);
            this.display = false;
            this.resetForm();
            this.messageService.add({ severity: enumToString(MessageType, MessageType.success), detail: res.message });
            this.popupSaveLoader = false;
          } else {
            this.messageService.add({ severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage });
            this.popupSaveLoader = false;
          }
        }
      });
    }

    this.submitted = false;
    this.invalidFormDisplay = false;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: `<strong>Վստա՞հ եք, որ ցանկանում եք հեռացնել այս տեսակը։<strong>`,
      accept: () => {
        this.naturesService.deleteNaturesById(id).subscribe((res: IResponse<void>) => {
          if (res) {
            if (res.success) {
              const nature = this.natures.filter(x => x.id === id)[0];
              const natureIndex = this.natures.indexOf(nature);
              this.natures.splice(natureIndex, 1);
              this.messageService.add({ severity: enumToString(MessageType, MessageType.success), detail: res.message });
            } else {
              this.messageService.add({ severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage });
            }
          }
        });
      },
      reject: () => {
        return false;
      }
    });
  }

  cancel() {
    if (this.naturesForm.dirty) {
      this.confirmationService.confirm({
        message: `Վստա՞հ եք, որ ցանկանում եք չեղարկել։ Ձեր կատարած փոփոխությունները չեն պահպանվելու։`,
        accept: () => {
          this.resetForm();
          this.display = false;
          this.submitted = false;
        },
        reject: () => {
          return false;
        }
      });
    } else {
      this.resetForm();
      this.display = false;
      this.submitted = false;
    }
  }

  resetForm() {
    this.naturesForm.reset();
    this.map_items = [];
    this.updateShapes = [];
    this.location_count = 0;
  }

  addNature() {
    this.isUpdate = false;
    this.initForm();
    const natures = this.naturesForm.get('natures') as FormArray;
    natures.push(this.createNature(LanguageEnum.am));
    natures.push(this.createNature(LanguageEnum.en));
    this.display = true;
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
            const natureImages = this.naturesForm.get('natureImages') as FormGroup;
            const new_images = natureImages.get('natureCreateImages') as FormArray;
            const new_image = this.createNewImage(data);
            new_images.push(new_image);
          } else {
            const natureImages = this.naturesForm.get('natureImages') as FormArray;
            const new_image = this.createNewImage(data);
            natureImages.push(new_image);
          }
        });
    }
  }

  onLanguageChange() {
    this.loader = true;
    this.naturesByLanguageIdPageSizeAndPage(this.selectedLanguage.id, appSettings.NATURE_ITEMS_GET_COUNT, appSettings.NATURE_ITEMS_GET_PAGE);
    this.getCategoriesByLanguageId(this.selectedLanguage.id);
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

  collapseNode(root) {
    const self = this;
    root.forEach(function (node) {
      delete node['expanded'];
      if (node['children'] !== []) {
        self.collapseNode(node['children']);
      } else {
        return;
      }
    });
  }

  clickExpandNode(event, rowNode) {
    rowNode.node.expanded = !rowNode.node.expanded;
    this.natureCategories = [...this.natureCategories];
    if (!rowNode.node.children || rowNode.node.children.length === 0) {
      this.naturesForm.get('natureCategoryID').patchValue( rowNode.node.data.id);
    }
  }
}
