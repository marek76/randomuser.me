import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsersFromApi } from './api';
import { usersCache } from './cache';
import type { User } from './types';

interface UsersState {
  items: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isRefreshing: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  status: 'idle',
  isRefreshing: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (forceRefresh: boolean | undefined = false) => {
    if (forceRefresh) {
      usersCache.clear();
    } else {
      const cached = usersCache.get();
      if (cached) return cached;
    }

    const users = await fetchUsersFromApi();
    usersCache.set(users);
    return users;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.error = null;
        if (state.items.length === 0) {
          state.status = 'loading';
        } else {
          state.isRefreshing = true;
        }
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isRefreshing = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.error.message ?? 'Neznámá chyba';
        if (state.items.length === 0) {
          state.status = 'failed';
        }
      });
  },
});

export default usersSlice.reducer;
