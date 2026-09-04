// features/users/usersSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Gender } from './types';

const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector(
  selectUsersState,
  (usersState) => usersState.items
);

// Seřazené podle příjmení, abecedně (case-insensitive, s ohledem na diakritiku)
export const selectUsersSortedByLastName = createSelector(
  selectUsers,
  (users) =>
    [...users].sort((a, b) =>
      a.name.last.localeCompare(b.name.last, 'cs', { sensitivity: 'base' })
    )
);

export const makeSelectUsersFiltered = (filter: Gender | null) =>
    createSelector(selectUsersSortedByLastName, (users) =>
        filter === null ? users : users.filter((user) => user.gender === filter)
    );