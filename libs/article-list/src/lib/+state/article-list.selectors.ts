import { Selector } from '@ngxs/store';
import { ListConfig } from '@realworld-angular-nx-ngxs/data-access';
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
}
