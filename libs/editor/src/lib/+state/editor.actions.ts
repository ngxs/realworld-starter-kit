import { Article } from '@realworld-angular-nx-ngxs/data-access';

export class CreateArticle {
  static readonly type = '[Articles] Create';
  constructor(public payload: Article) {}
}
