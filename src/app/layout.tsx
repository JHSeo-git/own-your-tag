import '../styles/global.css';

import { Noto_Sans } from '@next/font/google';

const notoSans = Noto_Sans({
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" className={notoSans.variable}>
      <head />
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
