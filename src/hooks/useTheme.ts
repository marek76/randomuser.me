// hooks/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext/ThemeContext.context';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme musí být použit uvnitř ThemeProvider');
  }
  return context;
}