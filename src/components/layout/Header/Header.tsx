import { MainNavigation } from '../../MainNavigation/MainNavigation';
import './Header.css';

const APP_NAME = "Moje aplikace";

interface HeaderProps {
  title?: string;
  activeItem: string;
  onItemClick: (id: string) => void
}

export function Header({ title = 'Moje aplikace', activeItem, onItemClick }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <span className="app-header__logo">{title || APP_NAME}</span>
        <MainNavigation activeItem={activeItem} onItemClick={onItemClick} />
      </div>
    </header>
  );
}
