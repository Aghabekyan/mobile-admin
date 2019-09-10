import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import {ITreeNode} from '../../infrastructure/interfaces/tree-node.interface';
import {MessageService} from 'primeng/api';
import {LanguageEnum, MessageType, NatureType} from '../../infrastructure/enums/index';
import {enumToString} from '../../infrastructure/utils/index';
import {NatureCategoryNode} from '../../infrastructure/models/index';
import {CategoriesService} from '../shared/services/index';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  natureCategories: ITreeNode[];
  isUpdate = false;
  display = false;
  popupSaveLoader = false;
  loader = true;
  categoryCreateOrUpdate: FormGroup;
  currentRowData: any;
  currentRowNode: any;
  languages: any[] = [
    {id: 2, name: 'Հայերեն', flag: 'arm.png'},
    {id: 1, name: 'English', flag: 'eng.png'},
  ];

  selectedCountry: any = this.languages[0];

  constructor(private categoriesService: CategoriesService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    this.getCategoriesByLanguageId(this.selectedCountry.id);
  }

  initForm() {
    const categoryFormDefinition = <any>{
      languageID: [null, [Validators.required]],
      natureType: [null, [Validators.required]],
      name: ['', [Validators.required]]
    };

    const formDefinition = <any>{
      id: [null, [Validators.required]],
      categories: this.fb.array([
        this.fb.group(categoryFormDefinition),
        this.fb.group(categoryFormDefinition)
      ])
    };
    if (this.isUpdate) {
      formDefinition.categories = this.fb.array([
        this.fb.group(categoryFormDefinition),
        this.fb.group(categoryFormDefinition)
      ]);
    }

    this.categoryCreateOrUpdate = this.fb.group(formDefinition);
  }

  getCategoriesByLanguageId(id: number) {
    this.categoriesService.allCategoriesByLanguageId(id).subscribe((res: IResponse<ITreeNode[]>) => {
      if (res) {
        if (res.success) {
          this.natureCategories = res.data;
          this.loader = false;
        } else {
          this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
        }
      }
    });
  }

  createCategory(id: number, natureType: NatureType, rowNode) {
    this.currentRowNode = rowNode;
    this.isUpdate = false;
    this.initForm();
    this.categoryCreateOrUpdate.get('id').patchValue(id);
    const categories = <FormArray>this.categoryCreateOrUpdate.get('categories');
    categories.at(0).get('languageID').patchValue(LanguageEnum.en);
    categories.at(1).get('languageID').patchValue(LanguageEnum.am);
    categories.at(0).get('natureType').patchValue(natureType);
    categories.at(1).get('natureType').patchValue(natureType);
    this.display = true;
  }

  editCategory(rowData) {
    this.currentRowData = rowData;
    this.isUpdate = true;
    this.initForm();
    this.categoriesService.natureCategoriesById(rowData.id).subscribe((res: IResponse<INatureCategory[]>) => {
      if (res) {
        if (res.success) {
          this.categoryCreateOrUpdate.get('categories').patchValue(res.data);
          this.categoryCreateOrUpdate.get('id').patchValue(res.data[0].id);
        } else {
          this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
        }
      }
    });
    this.display = true;
  }

  cancelCategory() {
    this.categoryCreateOrUpdate.reset();
    this.display = false;
    this.isUpdate = false;
    this.currentRowData = null;
    this.currentRowNode = null;
    this.popupSaveLoader = false;
  }

  saveCategory() {
    this.popupSaveLoader = true;
    if (this.isUpdate) {
      if (this.categoryCreateOrUpdate.valid) {
        this.categoriesService.updateCategoriesById(
          this.categoryCreateOrUpdate.get('id').value, this.categoryCreateOrUpdate.get('categories').value).subscribe((res: IResponse<void>) => {
          if (res) {
            if (res.success) {
              this.messageService.add({severity: enumToString(MessageType, MessageType.success), detail: res.message});
              this.currentRowData.name = ((this.categoryCreateOrUpdate.get('categories').value).filter(x => x.languageID === this.selectedCountry.id)[0].name);
              this.display = false;
              this.isUpdate = false;
              this.popupSaveLoader = false;
            } else {
              this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
              this.popupSaveLoader = false;
            }
          }
        });
      }
    } else {
      if (this.categoryCreateOrUpdate.valid) {
        const categoryCreateOrUpdateId = this.categoryCreateOrUpdate.get('id').value;
        this.categoriesService.createCategories(
          categoryCreateOrUpdateId, this.categoryCreateOrUpdate.get('categories').value).subscribe((res: IResponse<INatureCategory[]>) => {
          if (res) {
            if (res.success) {
              this.messageService.add({severity: enumToString(MessageType, MessageType.success), detail: res.message});
              const currentItem = <INatureCategory>res.data.filter(x => x.languageID === this.selectedCountry.id)[0];
              const node = {
                data: new NatureCategoryNode(currentItem.id, currentItem.name, currentItem.natureType, categoryCreateOrUpdateId),
                children: new Array<ITreeNode>()
              };

              this.currentRowNode.node.children.push(node);
              this.currentRowNode.node.expanded = true;
              this.natureCategories = [...this.natureCategories];
              this.display = false;
              this.popupSaveLoader = false;
            } else {
              this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
              this.popupSaveLoader = false;
            }
          }
        });
      }
    }
  }

  deleteCategory(rowNode) {
    this.confirmationService.confirm({
      message: `<strong>Վստա՞հ եք, որ ցանկանում եք հեռացնել ${rowNode.node.data.name} կատեգորիան: </strong><br><br>ՈՒՇԱԴՐՈՒԹՅՈՒՆ։ Կատեգորիան ջնջելիս համակարգից հեռացվելու են նաև բոլոր տեսակները, որոնք պատկանում են տվյալ կատեգորիային։`,
      accept: () => {
        this.display = false;
        this.categoriesService.deleteCategoriesById(rowNode.node.data.id).subscribe((res: IResponse<void>) => {
            if (res) {
              if (res.success) {
                if (rowNode.node.parent) {
                  const indexOfCurrentItem = rowNode.parent.children.indexOf(rowNode.node);
                  rowNode.parent.children.splice(indexOfCurrentItem, 1);
                  this.natureCategories = [...this.natureCategories];
                } else {
                  this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
                }
              }
            }
          }
        );
      },
      reject: () => {
        return false;
      }
    });
  }

  isNameExists(index: number) {
    return this.categoryCreateOrUpdate && this.categoryCreateOrUpdate.get('categories') &&
      (<FormArray>this.categoryCreateOrUpdate.get('categories')).at(index) &&
      (<FormArray>this.categoryCreateOrUpdate.get('categories')).at(index).get('name');
  }

  nodeDataName() {
    if (this.currentRowNode && this.currentRowNode.node && this.currentRowNode.node.data) {
      return this.currentRowNode.node.data.name;
    }
    return '';
  }

  canDelete(rowNode) {
    return rowNode.node.children && rowNode.node.children.length < 1 && rowNode.node.parent;
  }

  canUpdate(rowData) {
    return rowData.parentCategoryID ? true : false;
  }

  onLanguageChange() {
    this.loader = true;
    this.getCategoriesByLanguageId(this.selectedCountry.id);
  }

  clickExpandNode(event, rowNode) {
    if (event.target.localName === 'button' || event.target.parentElement.localName === 'button') {
      return;
    }
    rowNode.node.expanded = rowNode.node.expanded ? false : true;
    this.natureCategories = [...this.natureCategories];
  }

}
