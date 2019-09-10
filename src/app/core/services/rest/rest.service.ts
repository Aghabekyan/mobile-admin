import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import 'rxjs/add/operator/share';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';

@Injectable()
export abstract class RestService {
  url: string;
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(protected http: HttpClient,
              protected authService: AuthService,
              protected router: Router) {
    //this.getPolicy();
  }

  protected getPolicy() {
    this.authService.currentUser().map((data) => {
      this.headers.append('Content-Security-Policy', data.data.role);
    });
  }

  protected getHostingUrl(url) {
    return `${environment.hostingUrl + url}`;
  }

  protected retrieve<T>(url: string): Observable<IResponse<T | void>> {
    url = this.getHostingUrl(url);
    return this.interceptor(this.http.get(url, {headers: this.headers}).share());
  }

  protected post<T>(url: string, data: any, headers: HttpHeaders = this.headers): Observable<IResponse<T | void>> {
    url = this.getHostingUrl(url);
    return this.interceptor(this.http.post(url, data, {headers}).share());
  }

  protected put<T>(url: string, data: Object, headers: HttpHeaders = this.headers): Observable<IResponse<T | void>> {
    url = this.getHostingUrl(url);
    return this.interceptor(this.http.put(url, data, {headers}).share());
  }

  protected patch<T>(url: string, data?: Object, headers: HttpHeaders = this.headers): Observable<IResponse<T | void>> {
    url = this.getHostingUrl(url);
    return this.interceptor(this.http.patch(url, data, {headers}).share());
  }

  protected delete<T>(url: string, headers: HttpHeaders = this.headers): Observable<IResponse<T | void>> {
    url = this.getHostingUrl(url);
    return this.interceptor(this.http.delete(url, {headers}).share());
  }

  protected extractData(response: any) {
    return response || {};
  }

  private interceptor<T>(response: Observable<any>): Observable<IResponse<T | void>> {
    response.subscribe(
      null, (err) => {
        if (err.status === 401 || (err.message && err.message.indexOf('No JWT present or has expired') > -1)) {
          this.authService.logOut();
          this.router.navigate(['/login']);
        }
      }, null);
    return response.map(this.extractData).map((res: IResponse<any>) => {
      return res;
    });
  }
}
