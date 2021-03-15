import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { ArticleListState } from './+state/article-list.state';
import { ArticleListComponent } from './article-list.component';
import {
    ArticleListItemComponent,
} from './components/article-list-item/article-list-item.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgxsModule.forFeature([ArticleListState])],
  declarations: [ArticleListComponent, ArticleListItemComponent],
  exports: [ArticleListComponent]
})
export class ArticleListModule {}
