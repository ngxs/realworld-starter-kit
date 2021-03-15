import { Observable } from 'rxjs';

import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
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

  onFavorite(slug): void {
    this.store.dispatch(new ArticleListActions.Favorite(slug));
  }

  onUnFavorite(slug): void {
    this.store.dispatch(new ArticleListActions.UnFavorite(slug));
  }
}
