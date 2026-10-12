import styles from './MainNavigation.module.css';

interface MainNavigationProps {
  activeItem: string;
  onItemClick: (id: string) => void;
}

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export function MainNavigation({ activeItem, onItemClick }: MainNavigationProps) {
  return (
    <nav className={styles.mainNavigation}>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={activeItem === item.id ? styles.active : undefined}
          onClick={(event) => {
            event.preventDefault();
            onItemClick(item.id);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
