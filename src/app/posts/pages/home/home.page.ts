import { Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../../services/language.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  baseUrl: string = 'http://localhost:4200';
  serverData$: Observable<any> | undefined;
  isChecked?: boolean;
  selectedLang?: string;


  constructor(private translateService: TranslateService,
              private langService: LanguageService,
              private router: Router,
              private http: HttpClient,
              private title: Title,
              private meta: Meta) { }

  ngOnInit() {

    // this.prerenderRoutes(['/home', '/posts']);

    if(localStorage.getItem('userLanguage') === 'ua') {
      this.isChecked = true;
    }
    this.selectedLang = this.langService.UserLanguage.getValue();

    this.title.setTitle('Home / Angular SSR Implementing');
    this.meta.updateTag({
      'description': 'Angular SSR Implementing'
    });

  }

  changeLanguage(e: any) {
    let checked = e.detail.checked;
    switch (checked) {
      case false:
        localStorage['userLanguage'] = 'en';
        this.isChecked = false;
        this.langService.selectLanguage('en');
        break;
      case true:
        localStorage['userLanguage'] = 'ua';
        this.isChecked = true;
        this.langService.selectLanguage('ua');
        break;
      default:
        this.isChecked = false;
    }
  }

  goToPosts() {
    this.router.navigate(['posts']);
  }

  goToRecent() {
    this.serverData$ = this.http.get('recent');
  }

  prerenderRoutes(routes: string[]) {
    for (const route of routes) {
      this.http.get(`${this.baseUrl}${route}`).toPromise();
    }
  }
}
