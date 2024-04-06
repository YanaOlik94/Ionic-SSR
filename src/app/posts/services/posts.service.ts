import {Injectable} from '@angular/core';
import {delay, map, Observable, of} from "rxjs";
import {PostInterface} from "../types/post.interface";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url: string = 'https://jsonplaceholder.typicode.com/users/1/posts';
  posts: PostInterface[] = [];

  constructor(private http: HttpClient) { }

  getPosts(limit: number): Observable<PostInterface[]> {
    const params = {
      limit: limit.toString()
    };

    return this.http.get<PostInterface[]>(`${this.url}`, {params})
      .pipe(delay(2000));
  }

}
