import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createSelector, Store } from '@ngxs/store';
import { ArticleListActions, ArticleListSelectors } from '@realworld-angular-nx-ngxs/article-list';
import { AuthSelectors, Profile } from '@realworld-angular-nx-ngxs/data-access';
import { ProfileActions } from './+state/profile.actions';
import { ProfileSelectors } from './+state/profile.selectors';

@Component({
  selector: 'conduit-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage implements OnInit {
  profile$ = this.store.select(ProfileSelectors.profile);
  itsMe$ = this.store.select(ProfileSelectors.itsMe);

  constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const user = this.activatedRoute.snapshot.params.user;
    this.store.dispatch(new ProfileActions.Get(user));
    this.store.dispatch(new ArticleListActions.GetMyArticles());
    this.store.dispatch(new ArticleListActions.GetMyFavArticles());
  }
}
