import '@styles/globals.css';

import { Metadata } from 'next';
import SessionAuthProvider from '@components/SessionAuthProvider';

import Nav from '@components/Nav';
import { AppProps } from 'next/app';

export interface LayoutAppProps extends AppProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Discovery & share AI Prompts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionAuthProvider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />

            {children}
          </main>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
