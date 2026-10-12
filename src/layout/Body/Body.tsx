import type { ReactNode } from 'react';
import './Body.css';

interface BodyProps {
  children: ReactNode;
}

export function Body({ children }: BodyProps) {
  return (
    <main className="app-body">
      <div className="app-body__inner">{children}</div>
    </main>
  );
}
