import { Code2, Database, Network, Cpu } from 'lucide-react';

const projects = [
  {
    title: "High-Frequency Market Microstructure Analysis",
    description: "Built a Python/C++ pipeline processing order book ITCH data to detect spoofing and momentum ignition. Achieved sub-millisecond parsing latency.",
    tags: ["C++", "Python", "Level 3 Data", "KDB+"],
    icon: Database,
    link: "#"
  },
  {
    title: "Cross-Sectional Momentum via Graph Neural Networks",
    description: "Developed a GNN model to capture supply chain spillover effects and predict cross-sectional return anomalies in the Russell 1000 universe.",
    tags: ["PyTorch", "GNN", "Alternative Data", "Equities"],
    icon: Network,
    link: "#"
  },
  {
    title: "Options Volatility Surface Arbitrage",
    description: "Designed a real-time scanner for S&P 500 options identifying mispricings relative to a custom local volatility surface model.",
    tags: ["Derivatives", "Stochastic Calculus", "Rust"],
    icon: Cpu,
    link: "#"
  },
  {
    title: "Low-Latency Execution Engine",
    description: "Implemented a generic algorithmic trading execution engine supporting multi-leg strategies with FIX protocol integration.",
    tags: ["Java", "FIX", "Concurrency", "Market Making"],
    icon: Code2,
    link: "#"
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 relative bg-[var(--color-bg-dark)] border-t border-[var(--color-border-dark)] overflow-hidden">
      {/* Background terminal grid effect */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ backgroundImage: 'linear-gradient(var(--color-brand-blue) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-blue) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Research & Infrastructure</h2>
          <p className="text-[var(--color-text-muted)] font-mono text-sm uppercase">Selected works • 2024-Present</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="terminal-panel p-6 group hover:border-[var(--color-brand-blue)] transition-colors">
              <div className="flex items-start justify-between mb-4">
                <project.icon className="w-8 h-8 text-[var(--color-brand-blue)] group-hover:scale-110 transition-transform" />
                <a href={project.link} className="font-mono text-xs border border-[var(--color-border-dark)] px-2 py-1 rounded text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-blue)] group-hover:border-[var(--color-brand-blue)] transition-colors">
                  VIEW_SOURCE
                </a>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-brand-blue)] transition-colors">{project.title}</h3>
              <p className="text-[var(--color-text-muted)] mb-6 text-sm leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] rounded text-xs font-mono text-[var(--color-text-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
