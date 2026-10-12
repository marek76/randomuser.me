import type { User } from './types';

const LOCAL_STORAGE_KEY = 'users';

export const usersCache = {
  get(): User[] | null {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!cached) return null;

    try {
      return JSON.parse(cached) as User[];
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return null;
    }
  },

  set(users: User[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  },

  clear(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  },
};
