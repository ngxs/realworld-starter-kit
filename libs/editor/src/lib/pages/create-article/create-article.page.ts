import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Store } from '@ngxs/store';
import { Article } from '@realworld-angular-nx-ngxs/data-access';
import { CreateArticle } from './../../+state/editor.actions';
import { EditorSelectors } from './../../+state/editor.selectors';

@Component({
  selector: 'conduit-editor',
  templateUrl: './create-article.page.html',
  styleUrls: ['./create-article.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateArticlePage implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}

  submit(article: Article) {
    this.store.dispatch(new CreateArticle(article)).subscribe(() => {
      const slug = this.store.selectSnapshot(EditorSelectors.article).slug;
      this.store.dispatch(new Navigate(['/article', slug]));
    });
  }
}
