import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { User } from '../../types';
import { UserCard } from './UserCard';

const selectedUser: User = {
  id: 'user-1',
  name: { title: 'Miss', first: 'Jane', last: 'Doe' },
  email: 'jane.doe@example.com',
  picture: 'https://example.com/jane.jpg',
  gender: 'female',
  country: 'Canada',
};

describe('UserCard', () => {
  it('selects the user when the card is clicked', async () => {
    const onSelect = vi.fn();
    const session = userEvent.setup();

    render(<UserCard user={selectedUser} onSelect={onSelect} />);

    await session.click(screen.getByRole('button', { name: /Jane Doe/ }));

    expect(onSelect).toHaveBeenCalledWith(selectedUser);
  });
});
