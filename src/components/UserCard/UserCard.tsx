// components/UserCard/UserCard.tsx
import type { User } from '../../features/users/types';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
  className?: string;
}

export function UserCard({ user, className }: UserCardProps) {
  const { first: firstName, last: lastName } = user.name
  return (
    <div  className={[styles.userCard, className].filter(Boolean).join(' ')}>
      <img className={styles.userCardAvatar} src={user.picture} alt={lastName} />
      <div className={styles.userCardInfo}>
        <div className={styles.userCardName}>
           <span className={styles.userCardFirstname} title={firstName}>
            {firstName}
          </span> <span className={styles.userCardLastname}>
            {lastName}
          </span>
        </div>
        <span className={styles.userCardEmail}>{user.email}</span>
        <span className={styles.userCardCountry}>{user.country}</span>
      </div>
    </div>
  );
}