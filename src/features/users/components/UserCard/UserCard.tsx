import type { User } from '../../types';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
  className?: string;
  onSelect: (user: User) => void;
}

export function UserCard({ user, className, onSelect }: UserCardProps) {
  const { first: firstName, last: lastName } = user.name;
  const fullName = `${firstName} ${lastName}`;

  return (
    <article className={[styles.userCard, className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={styles.userCardButton}
        aria-haspopup="dialog"
        onClick={() => onSelect(user)}
      >
        <img
          className={styles.userCardAvatar}
          src={user.picture}
          alt={fullName}
          width={48}
          height={48}
        />
        <div className={styles.userCardInfo}>
          <div className={styles.userCardName}>
            <span className={styles.userCardFirstname} title={firstName}>
              {firstName}
            </span>
            <span className={styles.userCardLastname}>{lastName}</span>
          </div>
          <span className={styles.userCardEmail}>{user.email}</span>
          <span className={styles.userCardCountry}>{user.country}</span>
        </div>
      </button>
    </article>
  );
}
