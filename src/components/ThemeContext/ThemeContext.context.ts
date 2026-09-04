// components/ThemeContext/ThemeContext.context.ts
import { createContext } from 'react';

export interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);