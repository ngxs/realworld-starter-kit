import { Article, ListConfig, ListType } from '@realworld-angular-nx-ngxs/data-access';
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
