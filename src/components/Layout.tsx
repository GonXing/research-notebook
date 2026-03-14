import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MarketRibbon } from './MarketRibbon';
import { useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

export const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isPostDetailPage = location.pathname.startsWith('/post/');

  const handleCloseMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-dark)] text-[var(--color-text-main)] overflow-x-hidden w-full md:h-screen md:flex-row md:overflow-hidden">
      {/* Mobile Header Overlay */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[var(--color-border-dark)] bg-[var(--color-surface-dark)] sticky top-0 z-40 w-full">
        <h1 className="text-xl font-bold text-[var(--color-text-main)]">Jasin</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <Sidebar isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />

      {/* Right side: Ribbon + content */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        {/* Global Market Ribbon — visible on all pages */}
        <MarketRibbon />

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-none w-full">
          <div className={isPostDetailPage ? 'w-full px-6 py-6 md:px-8 md:py-10 xl:px-12' : 'max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-10'}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
