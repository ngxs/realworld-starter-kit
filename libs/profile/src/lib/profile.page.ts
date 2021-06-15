import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
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
  }
}
