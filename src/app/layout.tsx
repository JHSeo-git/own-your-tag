import '../styles/globals.css';

import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" className={inter.className}>
      <head />
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
