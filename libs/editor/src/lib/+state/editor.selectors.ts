import { Selector } from '@ngxs/store';
import { EditorState, EditorStateModel } from './editor.state';

export class EditorSelectors {
  @Selector([EditorState])
  static errors(state: EditorStateModel) {
    return state.errors;
  }

  @Selector([EditorState])
  static article(state: EditorStateModel) {
    return state.article;
  }
}
