import { useState } from 'react';
import { UserCard } from '../UserCard/UserCard';
import { GenderFilter } from '../GenderFilter/GenderFilter';
import { UserDetailsDialog } from '../UserDetailsDialog/UserDetailsDialog';
import { useUser } from '../../hooks/useUser';
import type { User } from '../../types';
import styles from './UsersList.module.css';

export function UsersList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const {
    users,
    status,
    error,
    isRefreshing,
    genderFilter,
    setGenderFilter,
    refresh,
  } = useUser();

  if (status === 'loading') {
    return <p>Načítám uživatele…</p>;
  }

  if (status === 'failed') {
    return (
      <div>
        <p role="alert">Chyba: {error}</p>
        <button type="button" onClick={refresh}>
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
        <button type="button" onClick={refresh} disabled={isRefreshing}>
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
          <UserCard
            key={user.id}
            user={user}
            className={styles.userCard}
            onSelect={setSelectedUser}
          />
        ))}
      </div>
      <UserDetailsDialog user={selectedUser} onClose={() => setSelectedUser(null)} />
    </section>
  );
}
