import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AUTH_API_URL} from './auth.url';
import {Observable} from 'rxjs';
import {PublicRestService} from '../rest/public-rest.service';
import {CookieOptions, CookieService} from 'ngx-cookie';
import {environment} from '../../../../environments/environment';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {LoginModel} from '../../../infrastructure/models';


@Injectable()
export class AuthService extends PublicRestService {
  private readonly client_id: string = 'client';
  private readonly grant_type: string = 'password';
  private readonly client_secret: string = 'secret';
  private readonly scope: string = 'webapi openid';

  constructor(protected http: HttpClient, private _cookieService: CookieService) {
    super(http);
  }

  protected getIdentityServerUrl(url) {
    return `${environment.identityServerUrl + url}`;
  }

  protected getHostingUrl(url) {
    return `${environment.userHostingUrl + url}`;
  }

  // public register(accountRegistrationModel: RegistrationModel): Observable<IResponse<Object | void>> {
  //   return this.post(AUTH_API_URL.register, accountRegistrationModel);
  // }

  protected identity(url: string, data: any): Observable<any> {
    url = this.getIdentityServerUrl(url);
    return this.http.post(url, data, {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})});
  }

  public login(loginModel: LoginModel): Observable<any> {
    const username = loginModel.email;
    const password = loginModel.password;
    const creds = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&client_id=${encodeURIComponent(this.client_id)}&grant_type=${encodeURIComponent(this.grant_type)}&client_secret=${encodeURIComponent(this.client_secret)}&scope=${encodeURIComponent(this.scope)}`;
    return this.identity(AUTH_API_URL.login, creds);
  }

  private get accessToken(): string {
    return this._cookieService.get('access_token');
  }

  public get rememberMe(): boolean {
    return this._cookieService.get('remember-me') === 'true';
  }

  public isAuthenticated(): boolean {
    try {
      const jwtHelper = new JwtHelperService();
      const token = this.accessToken;
      return !jwtHelper.isTokenExpired(token);
    } catch (err) {
      return false;
    }
  }

  public saveJwt(jwt, name: string, rememberMe: boolean = false): void {
    if (jwt) {
      const domain = window.location.hostname;
      const cookieOptions: CookieOptions = {domain: domain === 'localhost' ? null : `${domain}`};
      if (rememberMe) {
        const tokenObject = this.parseJwt(jwt);
        const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(tokenObject['exp']);
        cookieOptions.expires = d;
      }
      this._cookieService.put(name, jwt, cookieOptions);
    }
  }

  private getDomainName(hostName): string {
    return hostName.substring(hostName.lastIndexOf('.', hostName.lastIndexOf('.') - 1) + 1);
  }

  public logOut(): void {
    const url = this.getHostingUrl(AUTH_API_URL.logOut);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    const domain = window.location.hostname;
    this._cookieService.remove('access_token', {domain: domain === 'localhost' ? null : domain});
    this._cookieService.remove('remember-me', {domain: domain === 'localhost' ? null : domain});
  }

  public currentUser(): Observable<IResponse<IUserClaim>> {
    const url = this.getHostingUrl(AUTH_API_URL.current);
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken});
    const res = this.http.get<IResponse<IUserClaim>>(url, {headers: headers}).share();
    res.subscribe(() => {
      },
      (ex) => {
        const domain = window.location.hostname;
        this._cookieService.remove('access_token', {domain: domain === 'localhost' ? null : domain});
        this._cookieService.remove('remember-me', {domain: domain === 'localhost' ? null : domain});
        window.location.reload();
        return null;
      });
    return res;
  }

  private parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}
