// features/users/usersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RandomUserApiResponse, RandomUserApiResult } from './apiTypes';
import type { User, Gender } from './types';


interface UsersState {
  items: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  status: 'idle',
  error: null,
};

const LOCAL_STORAGE_KEY = 'users';

// Parametr forceRefresh: pokud true, ignoruje cache a stáhne čerstvá data
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (forceRefresh: boolean | undefined = false) => {
    if (forceRefresh) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached) as User[];
        } catch {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
    }

    const RESULTS = 18;
    const response = await fetch(`https://randomuser.me/api/?results=${RESULTS}`);
    if (!response.ok) {
      throw new Error('Nepodařilo se načíst uživatele');
    }
    const data: RandomUserApiResponse = await response.json();

    const users: User[] = data.results.map((r: RandomUserApiResult) => ({
      id: r.login.uuid,
      name: r.name,
      email: r.email,
      picture: r.picture.thumbnail,
      gender: r.gender as Gender,
      country: r.location.country,
    }));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));

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
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Neznámá chyba';
      });
  },
});

export default usersSlice.reducer;