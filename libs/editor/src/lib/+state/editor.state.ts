import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Article, ConduitApiService } from '@realworld-angular-nx-ngxs/data-access';
import { throwError } from 'rxjs';
import { parseError } from '@realworld-angular-nx-ngxs/utils';
import { CreateArticle, EditArticle, GetArticle } from './editor.actions';

export type EditorStateModel = {
  article: Article;
  errors: string[];
};

@State<EditorStateModel>({
  name: 'articles',
  defaults: {
    article: null,
    errors: []
  }
})
@Injectable()
export class EditorState {
  constructor(private conduitApi: ConduitApiService) {}

  @Action(CreateArticle)
  createArticle(ctx: StateContext<EditorStateModel>, { payload }: CreateArticle) {
    ctx.patchState({ article: null, errors: [] });
    return this.conduitApi.createArticle({ article: payload }).pipe(
      tap((article) => {
        ctx.patchState({ article });
      }),
      catchError((error) => {
        ctx.patchState({ errors: parseError(error) });
        return throwError(error);
      })
    );
  }

  @Action(EditArticle)
  editArticle(ctx: StateContext<EditorStateModel>, { payload }: CreateArticle) {
    ctx.patchState({ article: null, errors: [] });
    return this.conduitApi.updateArticle({ article: payload }).pipe(
      tap((article) => {
        ctx.patchState({ article });
      }),
      catchError((error) => {
        ctx.patchState({ errors: parseError(error) });
        return throwError(error);
      })
    );
  }

  @Action(GetArticle)
  getArticle(ctx: StateContext<EditorStateModel>, { payload }: GetArticle) {
    ctx.patchState({ article: null, errors: [] });
    return this.conduitApi.getArticle(payload).pipe(
      tap((article) => {
        ctx.patchState({ article });
      })
    );
  }
}
