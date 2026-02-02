import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ScrimFlow - Premium Scrim Manager',
  description: 'The autonomous Discord bot for tier-1 esports communities.',
  icons: {
    icon: '/brand-icon.png',
    shortcut: '/brand-icon.png',
    apple: '/brand-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
