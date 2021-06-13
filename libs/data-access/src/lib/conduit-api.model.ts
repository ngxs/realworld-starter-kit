import { User } from './+state/auth.model';

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
export interface LoginResponse {
  user: User;
}

export interface GetCurrentUserResponse {
  user: User;
}

export interface UpdateCurrentUserResponse {
  user: User;
}

export interface RegisterResponse {
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface UpdateAuthUserRequest {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface CreateArticleRequest {
  article: Article;
}

export type UpdateArticleRequest = CreateArticleRequest;
export interface CreateArticleResponse {
  article;
}

export type UpdateArticleResponse = CreateArticleResponse;
