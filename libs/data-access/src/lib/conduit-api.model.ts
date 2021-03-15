export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
  loading: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export interface TagsResponse {
  tags: string[];
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface ListConfig {
  type: ListType;
  currentPage: number;
  filters: Filters;
}

export interface Filters {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export type ListType = 'ALL' | 'FEED';
