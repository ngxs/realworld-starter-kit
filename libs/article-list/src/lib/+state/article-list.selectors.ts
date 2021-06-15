import { Selector } from '@ngxs/store';
import { Article, AuthSelectors, ListConfig, User } from '@realworld-angular-nx-ngxs/data-access';
import { ArticleListModel, PageInfo } from './article-list.model';
import { ArticleListState } from './article-list.state';
import { createPropertySelectors } from './ngxs-next';

export class ArticleListSelectors {
  static slices = createPropertySelectors<ArticleListModel>(ArticleListState);

  @Selector([ArticleListSelectors.slices.articlesCount, ArticleListSelectors.slices.listConfig])
  static pageInfo(articlesCount: number, listConfig: ListConfig): PageInfo {
    return {
      type: listConfig.type,
      currentPage: listConfig.currentPage,
      totalPages: Array.from(new Array(Math.ceil(articlesCount / listConfig.filters.limit)), (val, index) => index + 1)
    };
  }

  @Selector([ArticleListSelectors.slices.articles, AuthSelectors.slices.user])
  static myArticles(articles: Article[], user: User): Article[] {
    return articles?.filter((article) => article?.author?.username === user?.username);
  }

  @Selector([ArticleListSelectors.slices.articles, AuthSelectors.slices.user])
  static myFavArticles(articles: Article[], user: User): Article[] {
    return articles?.filter((article) => article.favorited);
  }
}
