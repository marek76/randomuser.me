import { useEffect, useId, useRef } from 'react';
import type { User } from '../../types';
import styles from './UserDetailsDialog.module.css';

interface UserDetailsDialogProps {
  user: User | null;
  onClose: () => void;
}

function formatGender(gender: User['gender']): string {
  return gender === 'female' ? 'Female' : 'Male';
}

export function UserDetailsDialog({ user, onClose }: UserDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };

    dialog.addEventListener('click', handleBackdropClick);
    if (!dialog.open) dialog.showModal();

    return () => {
      dialog.removeEventListener('click', handleBackdropClick);
    };
  }, [user]);

  if (!user) return null;

  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`.trim();

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-modal="true"
      onClose={onClose}
    >
      <div className={styles.header}>
        <button type="button" className={styles.closeButton} onClick={closeDialog}>
          Close
        </button>
        <div className={styles.identity}>
          <img
            className={styles.avatar}
            src={user.picture}
            alt={fullName}
            width={96}
            height={96}
          />
          <h2 id={titleId} className={styles.title}>
            {fullName}
          </h2>
        </div>
      </div>
      <dl className={styles.details}>
        <dt>Title</dt>
        <dd>{user.name.title}</dd>
        <dt>First name</dt>
        <dd>{user.name.first}</dd>
        <dt>Last name</dt>
        <dd>{user.name.last}</dd>
        <dt>Email</dt>
        <dd>{user.email}</dd>
        <dt>Gender</dt>
        <dd>{formatGender(user.gender)}</dd>
        <dt>Country</dt>
        <dd>{user.country}</dd>
        <dt>ID</dt>
        <dd>{user.id}</dd>
      </dl>
    </dialog>
  );
}
