import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ArticleListActions, ArticleListSelectors } from '@realworld-angular-nx-ngxs/article-list';

@Component({
  selector: 'conduit-my-favorite-articles',
  templateUrl: './my-favorite-articles.component.html',
  styleUrls: ['./my-favorite-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyFavoriteArticlesComponent implements OnInit {
  myFavArticles$ = this.store.select(ArticleListSelectors.myFavArticles);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new ArticleListActions.GetMyFavArticles());
  }
}
