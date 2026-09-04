import { useState } from 'react';
import type { ReactNode } from 'react';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import { Footer } from './Footer/Footer';
import './Layout.css';

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Move this local state to global store
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (id: string) => {
    setActiveItem(id);
  };

  return (
    <div className="app-layout">
      <Header title="Props..." onItemClick={handleItemClick} activeItem={activeItem} />
      <Body>{children}</Body>
      <Footer />
    </div>
  );
}
