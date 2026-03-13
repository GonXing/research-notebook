import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Github, Lock, FlaskConical, Compass, MessageCircle, Mail, LayoutDashboard } from 'lucide-react';
import { CATEGORIES } from '../utils/posts';
import { useEffect, useState } from 'react';
import alphaAvatar from '../assets/alpha_link_avatar.png';
import { MarketDashboard } from './MarketDashboard';
import { motion, AnimatePresence } from 'framer-motion';

const TERMINAL_MESSAGES = [
  'System: Alpha-Link | Status: Rigorous Researching...',
  'Core: Backtesting Factor Library | GNN Model Active',
  'Net: Parsing Market Signals | α-Engine Running...',
  'CPU: Stochastic Process Solver | PDE Mode: ON',
];

const TerminalStatus = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TERMINAL_MESSAGES.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      className="rounded px-2 py-1 overflow-hidden"
      style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.12)' }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35 }}
          className="text-[9px] font-mono truncate"
          style={{ color: '#46c97e' }}
        >
          <span className="opacity-60 mr-1">▶</span>{TERMINAL_MESSAGES[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'quant-research': BookOpen,
  'cs-lab': FlaskConical,
  'mfe-journey': Compass,
  'daily': MessageCircle,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  // Close sidebar automatically on route change (for mobile)
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
      )}

      <aside 
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-[var(--color-surface-dark)] border-r border-[var(--color-border-dark)] shrink-0 flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ boxShadow: '1px 0 15px -10px rgba(96, 165, 250, 0.4)' }}
      >
        <div className="hidden md:block border-b border-[var(--color-border-dark)] px-4 py-3">
          {/* Left-orb + Right-text layout */}
          <div className="flex items-center gap-3 mb-3">
            {/* Alpha-Link status dot */}
            <div className="shrink-0">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[rgba(96,165,250,0.3)]"
                  style={{ background: 'radial-gradient(circle at 35% 35%, #dde6ff 0%, #60a5fa 40%, #EAB308 100%)', boxShadow: '0 0 10px 2px rgba(234,179,8,0.3)' }}>
                  <img src={alphaAvatar} alt="Alpha-Link" className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>
            {/* Name + subtitle */}
            <div className="min-w-0">
              <h1
                className="text-base text-[var(--color-text-main)] leading-tight tracking-wide"
                style={{ fontWeight: 600, letterSpacing: '0.06em' }}
              >
                Jasin Kwok
              </h1>
              <p className="text-[10px] text-gray-400 leading-relaxed mt-0.5">
                <span className="block">SWUFE &amp; UESTC</span>
                <span className="block">Finance &amp; CS Dual Degree</span>
              </p>
            </div>
          </div>

          {/* Terminal status ticker */}
          <TerminalStatus />
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {/* Fixed pages */}
          <Link
            to="/"
            className={`flex items-center gap-2 justify-between px-3 py-2 rounded-md text-sm transition-colors ${
              location.pathname === '/'
                ? 'bg-[var(--color-bg-dark)] text-[var(--color-brand-primary)] border border-[var(--color-border-dark)]'
                : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-dark)]/50 hover:text-[var(--color-text-main)] border border-transparent'
            }`}
          >
            <span className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>首页</span>
            </span>
          </Link>

          <div className="pt-3 pb-1 px-3">
            <p className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">分类</p>
          </div>

          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || BookOpen;
            const isActive = location.pathname === `/category/${cat.id}`;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                title={cat.description}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-[var(--color-bg-dark)] text-[var(--color-brand-primary)] border border-[var(--color-border-dark)]'
                    : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-dark)]/50 hover:text-[var(--color-text-main)] border border-transparent'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{cat.label}</span>
                </span>
                {cat.protected && <Lock className="w-3 h-3 opacity-40 shrink-0" />}
              </Link>
            );
          })}

          <div className="mt-4">
            <MarketDashboard />
          </div>

        </nav>

        {/* Fixed Footer Icons */}
        <div className="mt-auto pt-4 pb-6 px-4 border-t border-[var(--color-border-dark)] flex items-center justify-around bg-[var(--color-surface-dark)]">
          <IconLink 
            to="/about" 
            icon={<User className="w-5 h-5" />} 
            label="关于我" 
          />
          <IconLink 
            href="https://github.com/GonXing" 
            icon={<Github className="w-5 h-5" />} 
            label="代码库" 
          />
          <IconLink 
            href="mailto:axingsleepy@outlook.com" 
            icon={<Mail className="w-5 h-5" />} 
            label="联系邮箱" 
          />
        </div>
      </aside>
    </>
  );
};

interface IconLinkProps {
  to?: string;
  href?: string;
  icon: React.ReactNode;
  label: string;
}

const IconLink = ({ to, href, icon, label }: IconLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const content = (
    <div 
      className="relative flex items-center justify-center p-2 rounded-md transition-colors text-[var(--color-text-muted)] hover:bg-[var(--color-bg-dark)]/50 hover:text-[var(--color-brand-primary)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="absolute bottom-full left-1/2 mb-2 px-2 py-1 bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] rounded text-[10px] whitespace-nowrap z-50 pointer-events-none"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (to) return <Link to={to}>{content}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
};


