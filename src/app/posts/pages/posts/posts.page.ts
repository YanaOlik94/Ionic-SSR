import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {select, Store} from "@ngrx/store";

import * as PostsActions from '../../store/actions'
import {Observable} from "rxjs";
import {AppStateInterface} from "../../../shared/types/app.state.interface";
import {errorSelector, isLoadingSelector, postsSelector} from "../../store/selectors";
import {PostInterface} from "../../types/post.interface";
import {Router} from "@angular/router";
import {addPost} from "../../store/actions";
import {AlertController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../../services/language.service";
import {isPlatformBrowser} from "@angular/common";
import {StateKey, TransferState} from "@angular/platform-browser";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss']
})
export class PostsPage implements OnInit {

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  posts$!: Observable<PostInterface[]> | null;
  selectedPost$!: Observable<PostInterface>;

  isChecked?: boolean;
  selectedLang?: string;
  private STATE_KEY_POSTS!: StateKey<Observable<PostInterface[]> | null>;

  constructor(private store: Store<AppStateInterface>,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: any,
              public alertController: AlertController,
              private translateService: TranslateService,
              private langService: LanguageService,
              private transferState: TransferState
  ) {

    translateService.addLangs(['en', 'ua']);
    translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    if (this.transferState.hasKey(this.STATE_KEY_POSTS)) {
      console.log('Get data from server');
      this.posts$ = this.transferState.get(this.STATE_KEY_POSTS, null);
      // this.transferState.remove(this.STATE_KEY_POSTS)
    } else {
      console.log('Get data from api');
      this.initializeData();
      this.store.dispatch(PostsActions.getPosts());
      if (isPlatformBrowser(this.platformId)) {
        this.transferState.set(this.STATE_KEY_POSTS, this.posts$);
      }
    }

    this.selectedLang = this.langService.UserLanguage.getValue();

    if(localStorage.getItem('userLanguage') === 'ua') {
      this.isChecked = true;
    }
  }

  initializeData(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.posts$ = this.store.pipe(select(postsSelector));
  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('ALERT.TITLE'),
      inputs: [
        {
          name: 'id',
          type: 'number',
          min: 10,
          max: 100,
          placeholder: this.translateService.instant('ALERT.PH_ID')
        },
        {
          name: 'title',
          type: 'text',
          placeholder: this.translateService.instant('ALERT.PH_TITLE')
        },
        {
          name: 'userId',
          type: 'text',
          placeholder: this.translateService.instant('ALERT.PH_AUTHOR')
        },
         {
          name: 'body',
          type: 'textarea',
          placeholder: this.translateService.instant('ALERT.PH_CONTENT')
        }
      ],
      buttons: [
        {
          text: this.translateService.instant('BUTTONS.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
           console.log('cancel')
          }
        }, {
          text: this.translateService.instant('BUTTONS.ADD'),
          handler: (data) => {
            const newPost: PostInterface = {
              id: data.id,
              userId: data.userId,
              title: data.title,
              body: data.body
            };
            console.log('Added new post!', data);
            this.store.dispatch(addPost({ post: newPost }));
          }
        }
      ]
    });

    await alert.present();
  }

  getPostById(postId: number | string) {
    this.router.navigate(['/posts', postId.toString()])
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
}
