import './globals.css'
import type { Metadata } from 'next'
import Header from './components/Header'
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Claude Artifacts', href: '/claude-artifacts', isNew: true },
  // { name: 'Income', href: '/income' },
  // { name: 'upload', href: '/upload-file'},
  // { name: 'recipe', href: '/recipe'  },
  // { name: 'chat', href: '/chat'  },
];

export const metadata: Metadata = {
  title: '100.AI - Keep discovering the best in AI',
  description: 'Discover the best AI tools and resources',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header link="/" navItems={navItems} />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
