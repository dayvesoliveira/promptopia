import type { Metadata, NextComponentType } from 'next';
import { Inter } from 'next/font/google';
import Nav from '@components/Nav';
import SessionAuthProvider from '@components/SessionAuthProvider';
import { AppProps } from 'next/app';

import '@styles/globals.css';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

export interface LayoutAppProps extends AppProps {
  children: React.ReactNode;
  Component: NextComponentType & {
    auth?: boolean;
    session?: Session;
  };
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Discovery & share AI Prompts',
};

export default function RootLayout({
  children,
  pageProps,
}: Readonly<{
  children: React.ReactNode;
  pageProps: any;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionAuthProvider session={pageProps?.session}>
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
