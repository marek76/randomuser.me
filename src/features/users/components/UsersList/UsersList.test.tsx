import { configureStore } from '@reduxjs/toolkit';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import type { User } from '../../types';
import usersReducer from '../../usersSlice';
import { UsersList } from './UsersList';

const selectedUser: User = {
  id: 'user-1',
  name: { title: 'Miss', first: 'Jane', last: 'Doe' },
  email: 'jane.doe@example.com',
  picture: 'https://example.com/jane.jpg',
  gender: 'female',
  country: 'Canada',
};

function renderList() {
  const store = configureStore({
    reducer: { users: usersReducer },
    preloadedState: {
      users: {
        items: [selectedUser],
        status: 'succeeded' as const,
        isRefreshing: false,
        error: null,
      },
    },
  });

  return render(
    <Provider store={store}>
      <UsersList />
    </Provider>,
  );
}

describe('UsersList', () => {
  it('opens a popup with all user details after the user is clicked', async () => {
    const session = userEvent.setup();
    renderList();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await session.click(screen.getByRole('button', { name: /Jane Doe/ }));

    const dialog = screen.getByRole('dialog', { name: 'Miss Jane Doe' });
    expect(within(dialog).getByText('jane.doe@example.com')).toBeInTheDocument();
    expect(within(dialog).getByText('Female')).toBeInTheDocument();
    expect(within(dialog).getByText('Canada')).toBeInTheDocument();
    expect(within(dialog).getByText('user-1')).toBeInTheDocument();

    await session.click(within(dialog).getByRole('button', { name: 'Close' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
