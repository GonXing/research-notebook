import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import alphaAvatar from '../assets/alpha_link_avatar.png';

const QUOTES = [
  { type: '量化名言', text: 'The market can remain irrational longer than you can remain solvent. — Keynes' },
  { type: '研究动态', text: '当前研究：基于 GNN 的供应链溢出效应在跨周期动量中的应用 (2026.Q1)' },
  { type: '量化名言', text: 'In God we trust. All others must bring data. — W. Edwards Deming' },
  { type: '研究动态', text: '近期：完成 S&P500 成分股波动率因子回测，IC = 0.062，ICIR = 1.83' },
  { type: '量化名言', text: 'Far more money has been lost by investors preparing for corrections than has been lost in corrections themselves. — Peter Lynch' },
  { type: '研究动态', text: '阶段目标：2026 暑假前完成买方量化研究实习 offer，GRE 目标 325+' },
  { type: '量化名言', text: 'It is not whether you are right or wrong, but how much money you make when you are right and how much you lose when you are wrong. — George Soros' },
  { type: '研究动态', text: '系统状态：Docker 量化工作站运行中 · JupyterLab @ :8888 · DB: PostgreSQL 16' },
  { type: '量化名言', text: 'The stock market is a device for transferring money from the impatient to the patient. — Warren Buffett' },
  { type: '研究动态', text: '申研进度：目标项目 CMU MSCF / Columbia MFE · 预计 2026.12 提交首批申请' },
];

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quote, setQuote] = useState(QUOTES[0]);

  const pickNewQuote = () => {
    const next = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(next);
  };

  const handleToggle = () => {
    if (!isOpen) pickNewQuote();
    setIsOpen(v => !v);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-dialog"
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="w-72 rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border-dark)]"
            style={{ background: '#141520' }}
          >
            {/* Header */}
            <div className="relative h-28 overflow-hidden flex items-end"
              style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #101a2e 100%)' }}
            >
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(96,165,250,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.4) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              {/* Avatar */}
              <img
                src={alphaAvatar}
                alt="Alpha-Link"
                className="absolute bottom-0 right-3 h-24 w-24 object-cover object-top rounded-t-xl opacity-90"
                style={{ filter: 'drop-shadow(0 0 10px rgba(96,165,250,0.5))' }}
              />
              {/* Title */}
              <div className="relative z-10 px-4 pb-3">
                <p className="text-[10px] font-mono text-[#60a5fa] tracking-widest uppercase">Alpha-Link</p>
                <p className="text-sm font-bold text-white">研究助理 · Online</p>
              </div>
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 p-1 text-white/40 hover:text-white/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-1 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-pulse" />
                <span className="text-[10px] font-mono text-[#EAB308] uppercase tracking-widest">
                  {quote.type}
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed min-h-[60px]">
                {quote.text}
              </p>
              <button
                onClick={pickNewQuote}
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono text-[#60a5fa] border border-[rgba(96,165,250,0.25)] hover:border-[rgba(96,165,250,0.6)] hover:bg-[rgba(96,165,250,0.05)] transition-all"
              >
                <Zap className="w-3 h-3" />
                换一条
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button — larger on desktop, dot on mobile */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' } }}
        aria-label="Alpha-Link 助手"
        className="relative overflow-hidden rounded-full shadow-lg border border-[rgba(96,165,250,0.3)]
          w-8 h-8 md:w-14 md:h-14
          flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #dde6ff 0%, #60a5fa 40%, #EAB308 100%)',
          boxShadow: '0 0 20px 4px rgba(234,179,8,0.3), 0 0 8px 2px rgba(96,165,250,0.4)',
        }}
      >
        {/* Avatar on desktop, just glow dot on mobile (handled by size classes) */}
        <img
          src={alphaAvatar}
          alt="Alpha-Link"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        {/* Mobile indicator dot */}
        <span className="md:hidden w-2 h-2 rounded-full bg-white/90" />
      </motion.button>
    </div>
  );
};
