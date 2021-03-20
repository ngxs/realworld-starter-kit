import { tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { Article, ConduitApiService, Filters, ListConfig } from '@realworld-angular-nx-ngxs/data-access';

import { ArticleListActions } from './article-list.actions';
import { articleListInitialState, ArticleListModel } from './article-list.model';

@State<ArticleListModel>({
  name: 'articleList',
  defaults: articleListInitialState
})
@Injectable()
export class ArticleListState {
  constructor(private conduitApi: ConduitApiService) {}

  @Action(ArticleListActions.SetPage)
  setPage(ctx: StateContext<ArticleListModel>, { page }: ArticleListActions.SetPage) {
    ctx.setState(
      patch<ArticleListModel>({
        listConfig: patch<ListConfig>({
          currentPage: page,
          filters: (oldFilters: Filters) => {
            return {
              ...oldFilters,
              offset: oldFilters.limit * page
            };
          }
        })
      })
    );

    return ctx.dispatch(new ArticleListActions.Load());
  }

  @Action(ArticleListActions.SetListConfig)
  setListConfig(ctx: StateContext<ArticleListModel>, { config }: ArticleListActions.SetListConfig) {
    ctx.setState(patch({ listConfig: config }));
    return ctx.dispatch(new ArticleListActions.Load());
  }

  @Action(ArticleListActions.Load)
  load(ctx: StateContext<ArticleListModel>, {}: ArticleListActions.Load) {
    const listConfig = ctx.getState().listConfig || ({} as ListConfig);
    return this.conduitApi
      .getArticles(listConfig)
      .pipe(tap(({ articles, articlesCount }) => ctx.setState(patch({ articles, articlesCount }))));
  }

  @Action(ArticleListActions.Favorite)
  favorite(ctx: StateContext<ArticleListModel>, { articleSlug }: ArticleListActions.Favorite) {
    return this.conduitApi.favoriteArticle(articleSlug).pipe(tap(() => ctx.dispatch(new ArticleListActions.Load())));
  }

  @Action(ArticleListActions.UnFavorite)
  unFavorite(ctx: StateContext<Article>, { articleSlug }: ArticleListActions.UnFavorite) {
    return this.conduitApi.unfavoriteArticle(articleSlug).pipe(tap(() => ctx.dispatch(new ArticleListActions.Load())));
  }
}
