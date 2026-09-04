// components/UsersList/UsersList.tsx
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUsers } from '../../features/users/usersSlice';
import { makeSelectUsersFiltered } from '../../features/users/usersSelectors';
import type { Gender } from '../../features/users/types';
import { UserCard } from '../UserCard/UserCard';
import { GenderFilter } from '../GenderFilter/GenderFilter';
import styles from './UsersList.module.css';

export function UsersList() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.users);
  const [genderFilter, setGenderFilter] = useState<Gender | null>(null);

  const selectUsersFiltered = useMemo(
    () => makeSelectUsersFiltered(genderFilter),
    [genderFilter]
  );
  const users = useAppSelector(selectUsersFiltered);

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
        <button onClick={handleRefresh}>Zkusit znovu</button>
      </div>
    );
  }

  if (status === 'succeeded') {
    return (
      <section>
        <div className={styles.usersListHeader}>
          <h3>Users List</h3>
          <GenderFilter value={genderFilter} onChange={setGenderFilter} />
          <button onClick={handleRefresh}>Obnovit data</button>
        </div>

        <div className={styles.usersList}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} className={styles.userCard} />
          ))}
        </div>
      </section>
    );
  }

  return null;
}