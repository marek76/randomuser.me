import { useTheme } from '../../../hooks/useTheme';
import './Footer.css';

export function Footer() {
  const { theme, toggleTheme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <span>&copy; {year} Playing with randomuser.me API.</span>
        <div>
          <button onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'} theme</button>
        </div>
      </div>
    </footer>
  );
}
