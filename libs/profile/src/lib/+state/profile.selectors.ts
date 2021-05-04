import { createSelector, Selector } from '@ngxs/store';
import { AuthSelectors, Profile } from '@realworld-angular-nx-ngxs/data-access';
import { ProfileState, ProfileStateModel } from './profile.state';

export class ProfileSelectors {
  @Selector([ProfileState])
  static profile(state: ProfileStateModel) {
    return state?.profile;
  }

  static itsMe = createSelector(
    [ProfileSelectors.profile, AuthSelectors.username],
    (profile: Profile, username: string) => {
      return profile?.username === username;
    }
  );
}
