import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export abstract class PublicRestService {
  url: string;
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(protected http: HttpClient) {
  }

  protected getHostingUrl(url) {
    return `${environment.hostingUrl + url}`;
  }

  protected retrieve(url: string) {
    url = this.getHostingUrl(url);
    return this.interceptor(this.http.get(url, {headers: this.headers}));
  }

  protected post(url: string, data: any, headers: HttpHeaders = this.headers) {
    url = this.getHostingUrl(url);
    return this.interceptor(this.http.post(url, data, { headers: headers }));
  }

  protected extractData(response: any) {
    return response || {};
  }

  protected put(url: string, data: any, headers: HttpHeaders = this.headers) {
    url = this.getHostingUrl(url);
    const body = JSON.stringify(data);
    return this.interceptor(this.http.put(url, body, { headers: headers }));
  }

  private interceptor(response: Observable<any>): Observable<any> {
    return response.map(this.extractData);
  }

}
