import { MainNavigation } from '../MainNavigation/MainNavigation';
import './Header.css';

interface HeaderProps {
  title: string;
  activeItem: string;
  onItemClick: (id: string) => void;
}

export function Header({ title, activeItem, onItemClick }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <span className="app-header__logo">{title}</span>
        <MainNavigation activeItem={activeItem} onItemClick={onItemClick} />
      </div>
    </header>
  );
}
