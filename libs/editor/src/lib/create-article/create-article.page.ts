import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CreateArticle } from './../+state/editor.actions';
import { EditorSelectors } from './../+state/editor.selectors';

@Component({
  selector: 'conduit-editor',
  templateUrl: './create-article.page.html',
  styleUrls: ['./create-article.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateArticlePage implements OnInit {
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    body: new FormControl(''),
    tagList: new FormControl('')
  });
  @Select(EditorSelectors.errors) errors$: Observable<string[]>;

  constructor(private store: Store) {}

  ngOnInit() {}

  submit() {
    const article = this.form.value;
    this.store.dispatch(new CreateArticle(article)).subscribe(() => {
      const slug = this.store.selectSnapshot(EditorSelectors.article).slug;
      this.store.dispatch(new Navigate(['/article', slug]));
    });
  }
}
