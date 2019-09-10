import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptionsArgs, Response, ResponseContentType} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../auth';
import {HttpClient, HttpHeaders} from '../../../../../node_modules/@angular/common/http';

@Injectable()
export abstract class FileRestService {
  public baseUrl: string = environment.hostingUrl;
  url: string;

  /*
    public headerData: RequestOptionsArgs = {};
  */
  public headerData: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Pragma': 'no-cache'});

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router) {

  }

  protected getHostingUrl(url: string) {
    return `${environment.hostingUrl + url}`;
  }

  protected retrieve<T>(url: string): Observable<IResponse<T | void>> {
    url = this.getHostingUrl(url);
    return this.interceptor(this.http.get(url, {headers: this.headerData, responseType: 'blob'}).share());
  }

  protected post<T>(url: string, data: Object): Observable<IResponse<T | void>> {
    url = this.getHostingUrl(url);
    return this.interceptor(this.http.post(url, data, {headers: this.headerData}).share());
  }

  protected extractData(response: any) {
    return response || {};
  }

  private interceptor(response): any {
    response.subscribe(
      null, (err) => {
        if (err.status === 401) {
          this.authService.logOut();
          this.router.navigate(['/login']);
        }
      }, null);
    return response.map(this.extractData).map((responseForReturn) => {
      return responseForReturn;
    });
  }


}
