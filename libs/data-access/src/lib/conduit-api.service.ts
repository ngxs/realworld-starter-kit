import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, mapTo, pluck } from 'rxjs/operators';
import type {
  Article,
  ArticlesResponse,
  CreateArticleRequest,
  CreateArticleResponse,
  GetArticleResponse,
  GetCurrentUserResponse,
  GetProfileResponse,
  ListConfig,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  TagsResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
  UpdateAuthUserRequest,
  UpdateCurrentUserResponse
} from './conduit-api.model';

@Injectable({
  providedIn: 'root'
})
export class ConduitApiService {
  readonly baseUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private store: Store) {}

  getTags() {
    return this.http.get<TagsResponse>(`${this.baseUrl}/tags`).pipe(map((response) => response.tags));
  }

  getArticles(listConfig: ListConfig) {
    const articlesType = listConfig.type === 'FEED' ? '/feed' : '';
    const params = new HttpParams({
      fromObject: listConfig.filters as any
    });
    return this.http.get<ArticlesResponse>(`${this.baseUrl}/articles${articlesType}`, {
      headers: this.headers(),
      params
    });
  }

  favoriteArticle(slug: string) {
    return this.http
      .post<Article>(`${this.baseUrl}/articles/${slug}/favorite`, null, { headers: this.headers() })
      .pipe(pluck('article'));
  }

  unfavoriteArticle(slug: string) {
    return this.http
      .delete<Article>(`${this.baseUrl}/articles/${slug}/favorite`, { headers: this.headers() })
      .pipe(pluck('article'));
  }

  login(loginRequest: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/users/login`, { user: loginRequest })
      .pipe(map((response) => response.user));
  }

  register(registerRequest: RegisterRequest) {
    return this.http
      .post<RegisterResponse>(`${this.baseUrl}/users`, { user: registerRequest })
      .pipe(map((response) => response.user));
  }

  getAuthUser() {
    return this.http
      .get<GetCurrentUserResponse>(`${this.baseUrl}/user`, {
        headers: this.headers()
      })
      .pipe(map((response) => response.user));
  }

  getProfile(userName: string) {
    return this.http
      .get<GetProfileResponse>(`${this.baseUrl}/profiles/${userName}`)
      .pipe(map((response) => response.profile));
  }

  followProfile(userName: string) {
    return this.http
      .post<GetCurrentUserResponse>(`${this.baseUrl}/profiles/${userName}/follow`, {
        headers: this.headers()
      })
      .pipe(mapTo(true));
  }

  unfollowProfile(userName: string) {
    return this.http
      .delete<GetCurrentUserResponse>(`${this.baseUrl}/profiles/${userName}/follow`, {
        headers: this.headers()
      })
      .pipe(mapTo(true));
  }

  private headers() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${this.store.selectSnapshot((s) => s.auth?.user?.token)}`
    };
  }

  updateAuthUser(updateAuthUserRequest: UpdateAuthUserRequest) {
    return this.http
      .put<UpdateCurrentUserResponse>(`${this.baseUrl}/user`, updateAuthUserRequest, { headers: this.headers() })
      .pipe(map((response) => response.user));
  }

  createArticle(createArticleRequest: CreateArticleRequest) {
    return this.http
      .post<CreateArticleResponse>(`${this.baseUrl}/articles`, createArticleRequest, {
        headers: this.headers()
      })
      .pipe(map((response) => response.article));
  }

  updateArticle(updateArticleRequest: UpdateArticleRequest) {
    return this.http
      .put<UpdateArticleResponse>(
        `${this.baseUrl}/articles/${updateArticleRequest.article.slug}`,
        updateArticleRequest,
        {
          headers: this.headers()
        }
      )
      .pipe(map((response) => response.article));
  }

  deleteArticle(slug: string) {
    return this.http
      .delete(`${this.baseUrl}/articles/${slug}`, {
        headers: this.headers()
      })
      .pipe(mapTo(true));
  }

  getArticle(slug: string) {
    return this.http
      .get<GetArticleResponse>(`${this.baseUrl}/articles/${slug}`, {
        headers: this.headers()
      })
      .pipe(map((response) => response.article));
  }
}
