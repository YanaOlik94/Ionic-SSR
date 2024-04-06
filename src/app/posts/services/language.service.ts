import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  UserLanguage: BehaviorSubject<string> = new BehaviorSubject<string>('en');

  constructor(private translateService: TranslateService) {

    const lang = localStorage['UserLanguage'];
    if (lang) {
      this.UserLanguage.next(lang);
    }
  }

  selectLanguage(_value: string) {
    this.UserLanguage.next(_value);
    this.translateService.use(_value);
    localStorage['userLanguage'] = _value;
  }

}
