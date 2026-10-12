import { useState, type ReactNode } from 'react';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import { Footer } from './Footer/Footer';
import './Layout.css';

const APP_NAME = 'randomuser.me';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [activeItem, setActiveItem] = useState('home');

  return (
    <div className="app-layout">
      <Header
        title={APP_NAME}
        activeItem={activeItem}
        onItemClick={setActiveItem}
      />
      <Body>{children}</Body>
      <Footer />
    </div>
  );
}
