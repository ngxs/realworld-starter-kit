import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateArticlePage } from './create-article/create-article.page';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { EditorState } from './+state/editor.state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: CreateArticlePage }]),
    NgxsModule.forFeature([EditorState])
  ],
  declarations: [CreateArticlePage]
})
export class EditorModule {}
