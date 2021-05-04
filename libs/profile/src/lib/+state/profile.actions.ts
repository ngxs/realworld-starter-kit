import { ListConfig } from '@realworld-angular-nx-ngxs/data-access';

export namespace ProfileActions {
  export class Get {
    static readonly type = '[Profile] Get';
    constructor(public user: string) {}
  }
  export class Follow {
    static readonly type = '[Profile] Follow';
    constructor(public user: string) {}
  }
  export class UnFollow {
    static readonly type = '[Profile] UnFollow';
    constructor(public user: string) {}
  }
}
