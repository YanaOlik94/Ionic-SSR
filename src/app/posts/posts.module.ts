import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostsPage} from './pages/posts/posts.page';
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducer";
import {EffectsModule} from "@ngrx/effects";
import {PostEffects} from "./store/effects";
import {PostsService} from "./services/posts.service";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MaxLengthPipe} from "./pipes/max-length.pipe";
import {PostDetailsPage} from "./pages/post-details/post-details.page";
import {HomePage} from "./pages/home/home.page";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpClientInterceptor} from "../shared/interceptors/http-interceptor";
import {AppRoutingModule} from "../app-routing.module";


@NgModule({
  declarations: [
    PostsPage,
    PostDetailsPage,
    HomePage,
    MaxLengthPipe
  ],
  exports: [
    PostsPage,
    PostDetailsPage,
    HomePage
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    StoreModule.forFeature('posts', reducers),
    EffectsModule.forFeature([PostEffects]),
    TranslateModule,
    AppRoutingModule
  ],
  providers: [
    PostsService, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    }
  ]
})
export class PostsModule {
}
