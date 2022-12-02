interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head />
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
