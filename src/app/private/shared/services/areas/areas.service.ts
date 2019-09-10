import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {RestService} from '../../../../core/services/rest';
import {AREAS_API_URL} from './areas.url';
import {ITreeNode} from '../../../../infrastructure/interfaces/tree-node.interface';
import {NATURES_API_URL} from '../natures/natures.url';

@Injectable()
export class AreasService extends RestService {

  public getHostingUrl(url) {
    return `${environment.userHostingUrl + url}`;
  }

  public allCategoriesByLanguageId(id: number): Observable<IResponse<ITreeNode[] | void>> {
    return this.retrieve(AREAS_API_URL.allCategoriesByLanguageId(id));
  }

  public natureAreasByLanguageIdPageSizeAndPage(id: number, size: number, page: number): Observable<IResponse<INatureAreaGet[] | void>> {
    return this.retrieve(AREAS_API_URL.natureAreasByLanguageIdPageSizeAndPage(id, size, page));
  }

  public natureAreasById(id: number): Observable<IResponse<INatureAreaGetForUpdate | void>> {
    return this.retrieve(AREAS_API_URL.natureAreasById(id));
  }

  public createNatureAreas(id: number, natureAreaCreate: INatureAreaCreate): Observable<IResponse<INatureAreaGet | void>> {
    return this.post(AREAS_API_URL.createNatureAreas(id), natureAreaCreate);
  }

  public updateNatureAreas(id: number, natureAreaUpdate: INatureAreaUpdate): Observable<IResponse<INatureAreaGet| void>> {
    return this.put(AREAS_API_URL.updateNatureAreas(id), natureAreaUpdate);
  }

  public deleteNatureAreasById(id: number): Observable<IResponse<void>> {
    return this.delete(AREAS_API_URL.deleteNatureAreasById(id));
  }
}
