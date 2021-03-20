import { Article, ListConfig } from '@realworld-angular-nx-ngxs/data-access';
import { ListType } from '../../../../data-access/src/lib/conduit-api.model';

export interface ArticleListModel {
  articles: Article[];
  articlesCount: number;
  listConfig: ListConfig;
}

export interface PageInfo {
  type: ListType;
  currentPage: number;
  totalPages: number[];
}

export const articleListInitialState: ArticleListModel = {
  listConfig: {
    type: 'ALL',
    currentPage: 0,
    filters: {
      limit: 10
    }
  },
  articles: null,
  articlesCount: 0
};
