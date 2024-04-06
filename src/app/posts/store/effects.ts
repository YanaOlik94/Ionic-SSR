import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostsService} from "../services/posts.service";
import {catchError, map, mergeMap, of, switchMap, tap} from "rxjs";
import {getPosts, getPostsFailure, getPostsSuccess} from "./actions";
import {paperPlane} from "ionicons/icons";

@Injectable()
export class PostEffects {
  getPosts$ = createEffect(
    () => this.actions$.pipe(
      ofType(getPosts),
      mergeMap(() => {
        return this.postService.getPosts(10).pipe(
          map((posts) => getPostsSuccess({posts})),
          catchError(error => of(getPostsFailure({error: error.message}))
          ))
      })
    )
  );

  constructor(private actions$: Actions,
              private postService: PostsService) {
  }
}
