import './globals.css'
import type { Metadata } from 'next'
import Header from './components/Header'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Claude Artifacts', href: '/claude-artifacts' },
  { name: 'GPUs', href: '/gpus' },
  { name: 'Books', href: '/books' },
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
      <body>
        <Header link="/" navItems={navItems} />
        <main>{children}</main>
      </body>
    </html>
  )
}
