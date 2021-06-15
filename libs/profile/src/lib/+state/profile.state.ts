import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { ConduitApiService, Profile } from '@realworld-angular-nx-ngxs/data-access';
import { ProfileActions } from './profile.actions';

export interface ProfileStateModel {
  profile: Profile;
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: null
  }
})
@Injectable()
export class ProfileState {
  constructor(private conduitApi: ConduitApiService) {}

  @Action(ProfileActions.Get)
  get(ctx: StateContext<ProfileStateModel>, { user }: ProfileActions.Get) {
    return this.conduitApi.getProfile(user).pipe(
      tap((profile) => {
        ctx.patchState({ profile });
      })
    );
  }

  @Action(ProfileActions.Follow)
  follow(ctx: StateContext<ProfileStateModel>, { user }: ProfileActions.Follow) {
    return this.conduitApi.followProfile(user).pipe(
      tap(() =>
        ctx.setState(
          patch<ProfileStateModel>({ profile: { following: true } as Profile })
        )
      )
    );
  }

  @Action(ProfileActions.UnFollow)
  unfollow(ctx: StateContext<ProfileStateModel>, { user }: ProfileActions.UnFollow) {
    return this.conduitApi.unfollowProfile(user).pipe(
      tap(() =>
        ctx.setState(
          patch<ProfileStateModel>({ profile: { following: false } as Profile })
        )
      )
    );
  }
}
