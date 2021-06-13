import { Article } from '@realworld-angular-nx-ngxs/data-access';

export class CreateArticle {
  static readonly type = '[Editor] Create';
  constructor(public payload: Article) {}
}

export class EditArticle {
  static readonly type = '[Editor] Edit';
  constructor(public payload: Article) {}
}

export class GetArticle {
  static readonly type = '[Editor] GetArticle';
  constructor(public payload: string) {}
}
