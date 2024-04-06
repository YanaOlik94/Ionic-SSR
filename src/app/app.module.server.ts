import { NgModule } from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {IonicServerModule} from "@ionic/angular-server";
import {RouterModule, Routes} from "@angular/router";
import {HomePage} from "./posts/pages/home/home.page";
import {PostsPage} from "./posts/pages/posts/posts.page";
import {PostDetailsPage} from "./posts/pages/post-details/post-details.page";


const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'posts',
    component: PostsPage
  },
  {
    path: 'posts/:id',
    component: PostDetailsPage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    IonicServerModule,
    ServerTransferStateModule,
    RouterModule.forRoot(routes, {initialNavigation: 'enabledNonBlocking' })
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
