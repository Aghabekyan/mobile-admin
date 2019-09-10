import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {RestService} from '../../../../core/services/rest/index';
import {CATEGORIES_API_URL} from './categories.url';
import {ITreeNode} from '../../../../infrastructure/interfaces/tree-node.interface';

@Injectable()
export class CategoriesService extends RestService {

  public getHostingUrl(url) {
    return `${environment.userHostingUrl + url}`;
  }

  public allCategoriesByLanguageId(id: number): Observable<IResponse<ITreeNode[] | void>> {
    return this.retrieve(CATEGORIES_API_URL.allCategoriesByLanguageId(id));
  }

  public natureCategoriesById(id: number): Observable<IResponse<INatureCategory[] | void>> {
    return this.retrieve(CATEGORIES_API_URL.natureCategoriesById(id));
  }

  public createCategories(id: number, natureCategoryCreate: INatureCategoryCreate[]): Observable<IResponse<INatureCategory[] | void>> {
    return this.post(CATEGORIES_API_URL.createCategories(id), natureCategoryCreate);
  }

  public updateCategoriesById(id: number, natureCategoryUpdate: INatureCategoryUpdate[]): Observable<IResponse<void>> {
    return this.put(CATEGORIES_API_URL.updateCategoriesById(id), natureCategoryUpdate);
  }

  public deleteCategoriesById(id: number): Observable<IResponse<void>> {
    return this.delete(CATEGORIES_API_URL.deleteCategoriesById(id));
  }
}
