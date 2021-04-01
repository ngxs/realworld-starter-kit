import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '@realworld-angular-nx-ngxs/data-access';

@Component({
  selector: 'conduit-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListItemComponent {
  @Input() article: Article;
  @Output() toggleFavorite: EventEmitter<Article> = new EventEmitter();
  @Output() navigateToArticle: EventEmitter<string> = new EventEmitter();
}
