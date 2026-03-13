import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Background terminal grid effect */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(var(--color-border-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-dark) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-green)] animate-pulse"></span>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">系统状态：正常运行</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="font-serif-en">Jasin</span> | 金融工程研究实验室<span className="text-[var(--color-brand-orange)]">.</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-[var(--color-brand-blue)] font-medium mb-6">
            西南财经大学 23 级 · 金融 + 计算机双学位。
          </h2>

          <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-10 max-w-2xl leading-relaxed">
            专注于量化因子研究与美股统计套利，致力于在金融逻辑与计算力之间寻找平衡。
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <a 
              href="#dashboard"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded text-[var(--color-bg-dark)] bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)]/90 transition-colors"
            >
              运行回测演示 <span className="ml-2 font-mono">_</span>
            </a>
            <a 
              href="https://github.com/jasin" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-[var(--color-border-dark)] text-base font-medium rounded text-[var(--color-text-main)] bg-[var(--color-surface-dark)] hover:bg-[var(--color-border-dark)] transition-colors"
            >
              查看代码仓库
            </a>
          </div>

          {/* Status Scrolling Ticker */}
          <div className="w-full max-w-2xl overflow-hidden border-y border-[var(--color-border-dark)] py-2 bg-[var(--color-surface-dark)]/50">
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-sm font-mono text-[var(--color-brand-green)]">
                当前研究：基于机器学习的美股波动率预测 (<span className="font-serif-en">2026.03</span>)
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-[var(--color-text-muted)]" />
      </div>
    </section>
  );
};
