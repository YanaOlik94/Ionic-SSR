import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsPage} from "./posts/pages/posts/posts.page";
import {PostDetailsPage} from "./posts/pages/post-details/post-details.page";
import {HomePage} from "./posts/pages/home/home.page";

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
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
