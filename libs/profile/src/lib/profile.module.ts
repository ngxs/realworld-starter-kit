import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProfilePage } from './profile.page';
import { ProfileState } from './+state/profile.state';
import { NgxsModule } from '@ngxs/store';
import { ArticleListModule } from '@realworld-angular-nx-ngxs/article-list';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { MyFavoriteArticlesComponent } from './components/my-favorite-articles/my-favorite-articles.component';

export const profileRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfilePage,
        children: [
          { path: '', component: MyArticlesComponent, pathMatch: 'full' },
          { path: 'favorites', component: MyFavoriteArticlesComponent }
        ]
      }
    ]),
    NgxsModule.forFeature([ProfileState]),
    ArticleListModule
  ],
  declarations: [ProfilePage, MyArticlesComponent, MyFavoriteArticlesComponent]
})
export class ProfileModule {}
