import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Meta, Title} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private translateService: TranslateService,
              private title: Title,
              private meta: Meta)  {
  }

  ngOnInit() {
    this.title.setTitle('Angular SSR title update');
    this.meta.updateTag({
      'description': 'Angular SSR description update'
    });
  }

  ngAfterViewInit() {
    try {
      this.initTranslate();

    } catch (e) {
      console.error(e);
    }
  }

  initTranslate() {
    try {
      this.translateService.addLangs(['en', 'ua']);
      this.translateService.setDefaultLang('en');

      if (localStorage.getItem('userLanguage')) {
        this.translateService.use(localStorage['userLanguage']);
      } else {
        this.translateService.use('en');
        localStorage['userLanguage'] = 'en';
      }
    } catch (e) {
      console.error(e);
    }
  }
}
