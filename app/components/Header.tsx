'use client';  // 添加这行来标记为客户端组件

import { useState } from 'react';
import Link from 'next/link';

interface NavItem {
  name: string;
  href: string;
  isNew?: boolean;
}

interface HeaderProps {
  link: string;
  navItems: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ link, navItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link href={link} className="text-2xl font-bold text-gray-900">
              100.AI
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-gray-500 hover:text-gray-900 relative"
              >
                {item.name}
                {item.isNew && (
                  <span className="absolute -top-1 -right-5 bg-red-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full leading-none">
                    New
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 mb-2 relative"
              >
                {item.name}
                {item.isNew && (
                  <span className="ml-2 inline-block bg-red-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full leading-none">
                    New
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
