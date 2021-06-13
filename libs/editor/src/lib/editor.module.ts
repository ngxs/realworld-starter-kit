import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateArticlePage } from './pages/create-article/create-article.page';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { EditorState } from './+state/editor.state';
import { EditArticlePage } from './pages/edit-article/edit-article.page';
import { ArticleFormComponent } from './components/article-form/article-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: CreateArticlePage }]),
    RouterModule.forChild([{ path: ':slug', pathMatch: 'full', component: EditArticlePage }]),
    NgxsModule.forFeature([EditorState])
  ],
  declarations: [CreateArticlePage, EditArticlePage, ArticleFormComponent]
})
export class EditorModule {}
