import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {RestService} from '../../../../core/services/rest/index';
import {NATURES_API_URL} from './natures.url';
import {ITreeNode} from '../../../../infrastructure/interfaces/tree-node.interface';

@Injectable()
export class NaturesService extends RestService {

  public getHostingUrl(url) {
    return `${environment.userHostingUrl + url}`;
  }

  public allCategoriesByLanguageId(id: number): Observable<IResponse<ITreeNode[] | void>> {
    return this.retrieve(NATURES_API_URL.allCategoriesByLanguageId(id));
  }

  public naturesByLanguageIdPageSizeAndPage(id: number, size: number, page: number): Observable<IResponse<INatureGet[] | void>> {
    return this.retrieve(NATURES_API_URL.naturesByLanguageIdPageSizeAndPage(id, size, page));
  }

  public naturesById(id: number): Observable<IResponse<INatureGetForUpdate | void>> {
    return this.retrieve(NATURES_API_URL.naturesById(id));
  }

  public createNatures(id: number, natureCreate: INatureCreate): Observable<IResponse<INatureGet | void>> {
    return this.post(NATURES_API_URL.createNatures(id), natureCreate);
  }

  public updateNatures(id: number, natureUpdate: INatureUpdate): Observable<IResponse<INatureGet | void>> {
    return this.put(NATURES_API_URL.updateNatures(id), natureUpdate);
  }

  public deleteNaturesById(id: number): Observable<IResponse<void>> {
    return this.delete(NATURES_API_URL.deleteNaturesById(id));
  }

}
