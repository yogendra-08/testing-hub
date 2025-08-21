import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  // This layout is minimal to avoid showing the main header/footer on the login page.
  // The dashboard will have its own nested layout.
  return <>{children}</>;
}
