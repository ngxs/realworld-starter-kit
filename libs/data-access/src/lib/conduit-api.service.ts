import { map, pluck } from 'rxjs/operators';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import type { Article, ArticlesResponse, ListConfig, TagsResponse } from './conduit-api.model';

@Injectable({
  providedIn: 'root'
})
export class ConduitApiService {
  readonly baseUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient) {}

  getTags() {
    return this.http.get<TagsResponse>(`${this.baseUrl}/tags`).pipe(map((response) => response.tags));
  }

  getArticles(listConfig: ListConfig) {
    const articlesType = listConfig.type === 'FEED' ? '/feed' : '';
    const params = new HttpParams({
      fromObject: listConfig.filters as any
    });
    return this.http.get<ArticlesResponse>(`${this.baseUrl}/articles${articlesType}`, {
      params
    });
  }

  favoriteArticle(slug) {
    return this.http.post<Article>(`${this.baseUrl}/articles/${slug}/favorite`, {}).pipe(pluck('article'));
  }

  unfavoriteArticle(slug) {
    return this.http.delete<Article>(`${this.baseUrl}/articles/${slug}/favorite`).pipe(pluck('article'));
  }
}
