import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Article } from '@realworld-angular-nx-ngxs/data-access';
import { Observable } from 'rxjs';
import { EditorSelectors } from '../../+state/editor.selectors';

@Component({
  selector: 'conduit-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleFormComponent implements OnInit, OnChanges {
  @Output() onSubmit: EventEmitter<Article> = new EventEmitter();
  @Input() article: Article;
  @Select(EditorSelectors.errors) errors$: Observable<string[]>;

  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    body: new FormControl(''),
    tagList: new FormControl(''),
    slug: new FormControl('')
  });

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['article']) {
      this.form.patchValue(changes['article'].currentValue);
    }
  }

  submit() {
    this.onSubmit.emit(this.form.value);
  }
}
