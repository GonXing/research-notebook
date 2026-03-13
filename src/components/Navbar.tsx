import React from 'react';
import { Terminal, ExternalLink, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-dark)]/90 backdrop-blur-sm border-b border-[var(--color-border-dark)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Terminal className="w-6 h-6 text-[var(--color-brand-orange)]" />
            <span className="font-mono text-xl font-bold tracking-tight text-[var(--color-text-main)]">
              QUANT<span className="text-[var(--color-brand-orange)]">PORT</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-brand-orange)] transition-colors">关于我</a>
            <a href="#dashboard" className="text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-brand-orange)] transition-colors">实时看板</a>
            <a href="#projects" className="text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-brand-orange)] transition-colors">研究项目</a>
            <div className="h-4 w-px bg-[var(--color-border-dark)]"></div>
            <a 
              href="https://jupyter.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-4 py-2 border border-[var(--color-brand-orange)] text-[var(--color-brand-orange)] rounded hover:bg-[var(--color-brand-orange)]/10 transition-colors text-sm font-mono"
            >
              <span>云端实验室 (<span className="font-serif-en">JupyterLab</span>)</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[var(--color-surface-dark)] border-b border-[var(--color-border-dark)]">
          <div className="px-4 pt-2 pb-4 flex flex-col space-y-3">
            <a href="#about" className="block text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-brand-orange)]">关于我</a>
            <a href="#dashboard" className="block text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-brand-orange)]">实时看板</a>
            <a href="#projects" className="block text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-brand-orange)]">研究项目</a>
            <div className="pt-2 border-t border-[var(--color-border-dark)]">
              <a 
                href="https://jupyter.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2 border border-[var(--color-brand-orange)] text-[var(--color-brand-orange)] rounded"
              >
                <span>云端实验室 (<span className="font-serif-en">JupyterLab</span>)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
