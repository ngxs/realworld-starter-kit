import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { Article } from '@realworld-angular-nx-ngxs/data-access';
import { ArticleListActions } from './+state/article-list.actions';
import { PageInfo } from './+state/article-list.model';

@Component({
  selector: 'conduit-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent implements OnInit {
  @Input() articles: Article[];
  @Input() pageInfo: PageInfo;
  @Output() setPage = new EventEmitter<number>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new ArticleListActions.Load());
  }

  toggleFavorite(article: Article): void {
    const action = article.favorited
      ? new ArticleListActions.UnFavorite(article.slug)
      : new ArticleListActions.Favorite(article.slug);

    this.store.dispatch(action);
  }
}
