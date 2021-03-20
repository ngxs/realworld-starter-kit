import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ArticleListActions,
  articleListInitialState,
  ArticleListSelectors,
  PageInfo
} from '@realworld-angular-nx-ngxs/article-list';
import type { Article, ListType } from '@realworld-angular-nx-ngxs/data-access';
import { AuthSelectors } from '@realworld-angular-nx-ngxs/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'conduit-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage {
  @Select(AuthSelectors.loggedIn) loggedIn$: Observable<boolean>;
  @Select(ArticleListSelectors.slices.articles) articleList$: Observable<Article[]>;
  @Select(ArticleListSelectors.pageInfo) pageInfo$: Observable<PageInfo>;

  constructor(private store: Store) {}

  onSetPage(pageNumber: number) {
    this.store.dispatch(new ArticleListActions.SetPage(pageNumber));
  }

  onArticleTypeChange(type: ListType) {
    this.store.dispatch(
      new ArticleListActions.SetListConfig({
        ...articleListInitialState.listConfig,
        type
      })
    );
  }
}
