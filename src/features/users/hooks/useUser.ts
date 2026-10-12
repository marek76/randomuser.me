import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchUsers } from '../usersSlice';
import {
  selectFilteredUsers,
  selectIsRefreshing,
  selectUsersError,
  selectUsersStatus,
} from '../usersSelectors';
import type { Gender, User } from '../types';

export interface UseUserResult {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isRefreshing: boolean;
  genderFilter: Gender | null;
  setGenderFilter: (value: Gender | null) => void;
  refresh: () => void;
}

export function useUser(): UseUserResult {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectUsersStatus);
  const error = useAppSelector(selectUsersError);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const [genderFilter, setGenderFilter] = useState<Gender | null>(null);
  const users = useAppSelector((state) => selectFilteredUsers(state, genderFilter));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const refresh = () => {
    dispatch(fetchUsers(true));
  };

  return {
    users,
    status,
    error,
    isRefreshing,
    genderFilter,
    setGenderFilter,
    refresh,
  };
}
