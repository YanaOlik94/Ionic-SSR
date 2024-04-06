import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppStateInterface} from "../../../shared/types/app.state.interface";
import {Observable} from "rxjs";
import {PostInterface} from "../../types/post.interface";
import {ActivatedRoute} from "@angular/router";
import {selectNewPost, selectPostById} from "../../store/selectors";
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../../services/language.service";


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  selectedPost$!: Observable<PostInterface | undefined>;
  selectedLang!: string;
  id: any;

  constructor(private store: Store<AppStateInterface>,
              private route: ActivatedRoute,
              private translateService: TranslateService,
              private langService: LanguageService) {

    this.id = this.route.snapshot.params['id'];

    translateService.addLangs(['en', 'ua']);
    translateService.setDefaultLang('en');
  }

  ngOnInit() {
    this.selectedLang = this.langService.UserLanguage.getValue();

    if (this.id > 10) {
      this.selectedPost$ = this.store.pipe(select(selectNewPost(this.id)));
    } else
      this.selectedPost$ = this.store.pipe(select(selectPostById(this.id)));
  }

}
