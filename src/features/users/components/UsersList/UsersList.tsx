import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchUsers } from '../../usersSlice';
import {
  selectFilteredUsers,
  selectIsRefreshing,
  selectUsersError,
  selectUsersStatus,
} from '../../usersSelectors';
import type { Gender } from '../../types';
import { UserCard } from '../UserCard/UserCard';
import { GenderFilter } from '../GenderFilter/GenderFilter';
import styles from './UsersList.module.css';

export function UsersList() {
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

  const handleRefresh = () => {
    dispatch(fetchUsers(true));
  };

  if (status === 'loading') {
    return <p>Načítám uživatele…</p>;
  }

  if (status === 'failed') {
    return (
      <div>
        <p role="alert">Chyba: {error}</p>
        <button type="button" onClick={handleRefresh}>
          Zkusit znovu
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className={styles.usersListHeader}>
        <h3>Users List</h3>
        <GenderFilter value={genderFilter} onChange={setGenderFilter} />
        <button type="button" onClick={handleRefresh} disabled={isRefreshing}>
          {isRefreshing ? 'Obnovuji…' : 'Obnovit data'}
        </button>
      </div>

      {error && (
        <p className={styles.errorBanner} role="alert">
          Chyba při obnovení: {error}
        </p>
      )}

      {isRefreshing && (
        <div className={styles.statusRow}>
          <p>Načítám nová data…</p>
        </div>
      )}

      <div className={styles.usersList}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} className={styles.userCard} />
        ))}
      </div>
    </section>
  );
}
