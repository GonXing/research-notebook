import { Terminal } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-8 bg-[var(--color-surface-dark)] border-t border-[var(--color-border-dark)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Terminal className="w-5 h-5 text-[var(--color-brand-orange)]" />
            <span className="font-mono text-lg font-bold tracking-tight text-[var(--color-text-main)]">
              QUANT<span className="text-[var(--color-brand-orange)]">PORT</span>
            </span>
          </div>
          
          <div className="text-sm font-mono text-[var(--color-text-muted)] text-center md:text-right">
            <p>Built with React & Tailwind CSS.</p>
            <p>System operational. All systems normal.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
