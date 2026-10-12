import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { User } from '../../types';
import { UserDetailsDialog } from './UserDetailsDialog';

const selectedUser: User = {
  id: 'user-1',
  name: { title: 'Miss', first: 'Jane', last: 'Doe' },
  email: 'jane.doe@example.com',
  picture: 'https://example.com/jane.jpg',
  gender: 'female',
  country: 'Canada',
};

describe('UserDetailsDialog', () => {
  it('shows every detail of the selected user', () => {
    render(<UserDetailsDialog user={selectedUser} onClose={vi.fn()} />);

    const dialog = screen.getByRole('dialog', { name: 'Miss Jane Doe' });
    expect(within(dialog).getByText('Miss')).toBeInTheDocument();
    expect(within(dialog).getByText('Jane')).toBeInTheDocument();
    expect(within(dialog).getByText('Doe')).toBeInTheDocument();
    expect(within(dialog).getByText('jane.doe@example.com')).toBeInTheDocument();
    expect(within(dialog).getByText('Female')).toBeInTheDocument();
    expect(within(dialog).getByText('Canada')).toBeInTheDocument();
    expect(within(dialog).getByText('user-1')).toBeInTheDocument();
    expect(within(dialog).getByRole('img', { name: 'Miss Jane Doe' })).toHaveAttribute(
      'src',
      selectedUser.picture,
    );
  });

  it('does not show a dialog when no user is selected', () => {
    render(<UserDetailsDialog user={null} onClose={vi.fn()} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when Close is clicked', async () => {
    const onClose = vi.fn();
    const session = userEvent.setup();
    render(<UserDetailsDialog user={selectedUser} onClose={onClose} />);

    await session.click(screen.getByRole('button', { name: 'Close' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
