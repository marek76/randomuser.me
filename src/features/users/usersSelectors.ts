import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Gender } from './types';

const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector(
  selectUsersState,
  (usersState) => usersState.items
);

export const selectUsersStatus = createSelector(
  selectUsersState,
  (usersState) => usersState.status
);

export const selectUsersError = createSelector(
  selectUsersState,
  (usersState) => usersState.error
);

export const selectIsRefreshing = createSelector(
  selectUsersState,
  (usersState) => usersState.isRefreshing
);

export const selectUsersSortedByLastName = createSelector(selectUsers, (users) =>
  [...users].sort((a, b) =>
    a.name.last.localeCompare(b.name.last, 'cs', { sensitivity: 'base' })
  )
);

export const selectFilteredUsers = createSelector(
  [
    selectUsersSortedByLastName,
    (_state: RootState, filter: Gender | null) => filter,
  ],
  (users, filter) =>
    filter === null ? users : users.filter((user) => user.gender === filter)
);
