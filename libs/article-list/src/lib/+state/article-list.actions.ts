import { ListConfig } from '@realworld-angular-nx-ngxs/data-access';

export namespace ArticleListActions {
  export class Load {
    static readonly type = '[ArticleList] Load';
    constructor(public readonly offset = 0) {}
  }

  export class GetMyArticles {
    static readonly type = '[ArticleList] GetMyArticles';
    constructor() {}
  }

  export class GetMyFavArticles {
    static readonly type = '[ArticleList] GetMyFavArticles';
    constructor() {}
  }
  export class Favorite {
    static readonly type = '[ArticleList] Favorite';
    constructor(public readonly articleSlug: string) {}
  }
  export class UnFavorite {
    static readonly type = '[ArticleList] Unfavorite';
    constructor(public readonly articleSlug: string) {}
  }
  export class SetPage {
    static readonly type = '[ArticleList] Set Page';
    constructor(public readonly page: number) {}
  }
  export class SetListConfig {
    static readonly type = '[ArticleList] Set List Config';
    constructor(public readonly config: ListConfig) {}
  }
}
