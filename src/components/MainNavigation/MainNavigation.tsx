import styles from './MainNavigation.module.css';


interface props {
  activeItem: string;
  onItemClick: (id: string) => void
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

export function MainNavigation({activeItem, onItemClick }: props) {
  return (
    <nav className={styles.mainNavigation}>
        {NAV_ITEMS.map((item) => (
        <a
            key={item.id}
            href={`#${item.id}`}
            className={activeItem === item.id ? styles.active : undefined}
            onClick={() => onItemClick(item.id)}
        >
            {item.label}
        </a>
        ))}
    </nav>
  );
}
