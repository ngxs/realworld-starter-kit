import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleListModule } from '@realworld-angular-nx-ngxs/article-list';

import { TagListModule } from './components/tag-list/tag-list.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: HomePage }]),
    TagListModule,
    ArticleListModule
  ],
  declarations: [HomePage]
})
export class HomeModule {}
