import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, BehaviorSubject} from 'rxjs';
import {
  TranslateService,
} from '@ngx-translate/core';

import {appSettings} from '../../../app.settings';
import {SharedService} from '../shared/shared.service';
import {LocalService} from '../local';

@Injectable()
export class LocalizationService {
  private langList: string[] = appSettings.langList;
  private previousLanguage: string;
  private curLanguage: string;
  private serviceConstants: { culture: string } = {
    culture: appSettings.cultureName
  };

  constructor(private translate: TranslateService,
              private sharedService: SharedService,
              private localService: LocalService,
              private router: Router) {
  }

  public init(lang: string) {
    this.translate.addLangs(this.langList);
    this.translate.setDefaultLang(appSettings.DEFAULT_LANGUAGE);
    this.translate.use(lang);
    this.localService.setItem(this.serviceConstants.culture, lang);
    this.curLanguage = lang;
  }

  public changeLanguage(lang: string) {
    if (this.langList.indexOf(lang) >= 0) {
      this.previousLanguage = this.localService.getItem(this.serviceConstants.culture);
      this.translate.use(lang);
      if (this.localService.getItem(this.serviceConstants.culture) !== null) {
        this.localService.removeItem(this.serviceConstants.culture);
      }

      this.localService.setItem(this.serviceConstants.culture, lang);
      this.curLanguage = lang;
      this.sharedService.language.next(lang);
    }
  }

  get(key: string, value?: object): Observable<string | any> {
    return this.translate.get(key, value);
  }

  get currentLanguage() {
    return this.curLanguage || this.localService.getItem('culture') || appSettings.DEFAULT_LANGUAGE;
  }

  public navigateTo(pageName: string, queryParamName?: string, queryParamValue?: string): void {
    if (queryParamName && queryParamValue) {
      this.router.navigate([`${pageName}`], {queryParams: {[queryParamName]: queryParamValue}});
      return;
    }
    this.router.navigate([`${pageName}`]);
  }

  public navigateToParams(pageName: string, paramValue: string): void {
    this.router.navigate([`${pageName}`, paramValue]);
  }

}
