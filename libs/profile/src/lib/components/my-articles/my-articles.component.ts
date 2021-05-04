import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ArticleListSelectors } from '@realworld-angular-nx-ngxs/article-list';

@Component({
  selector: 'conduit-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyArticlesComponent implements OnInit {
  myArticles$ = this.store.select(ArticleListSelectors.myArticles);

  constructor(private store: Store) {}

  ngOnInit() {}
}
