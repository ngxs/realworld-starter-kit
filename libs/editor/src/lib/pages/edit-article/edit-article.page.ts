import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Article } from '@realworld-angular-nx-ngxs/data-access';
import { Observable } from 'rxjs';
import { EditArticle, GetArticle } from '../../+state/editor.actions';
import { EditorSelectors } from '../../+state/editor.selectors';

@Component({
  selector: 'conduit-edit-article',
  templateUrl: './edit-article.page.html',
  styleUrls: ['./edit-article.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditArticlePage implements OnInit {
  @Select(EditorSelectors.article) article$: Observable<Article>;

  constructor(private store: Store) {}

  ngOnInit() {
    const slug = this.store.selectSnapshot(RouterState.state).root.firstChild.firstChild.paramMap.get('slug');
    this.store.dispatch(new GetArticle(slug));
  }

  submit(article: Article) {
    this.store.dispatch(new EditArticle(article)).subscribe(() => {
      const slug = this.store.selectSnapshot(EditorSelectors.article).slug;
      this.store.dispatch(new Navigate(['/article', slug]));
    });
  }
}
