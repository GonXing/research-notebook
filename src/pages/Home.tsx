import { useState, useEffect } from 'react';
import { getAllPosts, CATEGORIES } from '../utils/posts';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  BookOpen, Github, Server, Zap,
  Activity, Map,
} from 'lucide-react';
import { AlphaPanel } from '../components/AlphaLink';


// ──────────────────────────────────────────────────────────────────────────────
// Module A: Latest Insights
// ──────────────────────────────────────────────────────────────────────────────
const LatestInsights = () => {
  const protectedIds = CATEGORIES.filter(c => c.protected).map(c => c.id);
  const posts = getAllPosts()
    .filter(p => !protectedIds.includes(p.category))
    .slice(0, 4);

  const catColor: Record<string, string> = {
    'quant-research': '#60a5fa',
    'cs-lab': '#00FF9D',
    'mfe-journey': '#EAB308',
  };

  return (
    <div className="bento-card flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[var(--color-brand-primary)]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
            Latest Insights
          </span>
        </div>
        <Link
          to="/"
          className="text-[10px] font-mono text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] transition-colors flex items-center gap-1"
        >
          ALL <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-2">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="group block"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--color-text-main)] group-hover:text-[var(--color-brand-primary)] transition-colors truncate">
                  {post.metadata.title || 'Untitled'}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <time className="text-[10px] font-mono text-[var(--color-text-muted)]">
                    {(() => {
                      const d = new Date(post.metadata.date);
                      return !isNaN(d.getTime()) ? d.toLocaleDateString('en-CA') : '—';
                    })()}
                  </time>
                  {(post.metadata.tags || []).slice(0, 2).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[9px] px-1.5 py-px rounded font-mono border"
                      style={{
                        color: catColor[post.category] || '#8b949e',
                        borderColor: `${catColor[post.category] || '#8b949e'}33`,
                        background: `${catColor[post.category] || '#8b949e'}0a`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-mono text-[var(--color-text-muted)] shrink-0 mt-0.5">
                0{i + 1}
              </span>
            </div>
            {i < posts.length - 1 && (
              <div className="mt-2 h-px" style={{ background: 'rgba(96,165,250,0.07)' }} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Module B: Bio & System Status
// ──────────────────────────────────────────────────────────────────────────────
const SYSTEM_STATES = [
  { label: 'Alpha-Link', value: 'ACTIVE', ok: true },
  { label: 'Beijing VPS', value: 'ONLINE', ok: true },
  { label: 'Research DB', value: 'SYNCED', ok: true },
  { label: 'Factor Engine', value: 'RUNNING', ok: true },
];

const BioPanel = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bento-card flex flex-col gap-2">
      {/* Identity */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-[var(--color-brand-primary)]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
            Researcher Profile
          </span>
        </div>
        <h2 className="text-xl font-semibold tracking-wide mt-1" style={{ letterSpacing: '0.04em' }}>
          Jasin Kwok
        </h2>
        <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5 font-mono">
          SWUFE &amp; UESTC · Finance &amp; CS Dual Degree
        </p>
        <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
          Quant Research · MFE 2027 Candidate
        </p>
      </div>

      {/* System status grid */}
      <div className="grid grid-cols-2 gap-2">
        {SYSTEM_STATES.map(s => (
          <div
            key={s.label}
            className="flex items-center justify-between px-2 py-1 rounded"
            style={{ background: 'rgba(96,165,250,0.04)', border: '1px solid rgba(96,165,250,0.1)' }}
          >
            <span className="text-[9px] font-mono text-[var(--color-text-muted)]">{s.label}</span>
            <span
              className="text-[9px] font-mono flex items-center gap-1"
              style={{ color: s.ok ? '#00FF9D' : '#f87171' }}
            >
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: tick * 0.1 }}
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: s.ok ? '#00FF9D' : '#f87171' }}
              />
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Module C: Quant Toolbox
// ──────────────────────────────────────────────────────────────────────────────
const TOOLS = [
  {
    label: 'JupyterLab',
    sublabel: '101.200.120.206:8888 · VPS',
    href: 'http://101.200.120.206:8888/',
    icon: <Zap className="w-4 h-4" />,
    color: '#EAB308',
  },
  {
    label: 'Code Repo',
    sublabel: 'github.com/GonXing',
    href: 'https://github.com/GonXing',
    icon: <Github className="w-4 h-4" />,
    color: '#60a5fa',
  },
  {
    label: '2027 MFE Roadmap',
    sublabel: 'CMU · Columbia · MIT',
    to: '/category/mfe-journey',
    icon: <Map className="w-4 h-4" />,
    color: '#00FF9D',
  },
];

const QuantToolbox = () => (
  <div className="bento-card flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <Server className="w-4 h-4 text-[var(--color-brand-primary)]" />
      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
        Quant Toolbox
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {TOOLS.map(tool => {
        const inner = (
          <div
            className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg border group cursor-pointer transition-all duration-200 hover:scale-[1.01] text-center"
            style={{
              border: `1px solid ${tool.color}22`,
              background: `${tool.color}08`,
            }}
          >
            <span style={{ color: tool.color }} className="shrink-0">
              {tool.icon}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[var(--color-text-main)] group-hover:text-white transition-colors truncate">
                {tool.label}
              </p>
            </div>
          </div>
        );

        if (tool.to) return <Link key={tool.label} to={tool.to}>{inner}</Link>;
        return <a key={tool.label} href={tool.href} target="_blank" rel="noopener noreferrer">{inner}</a>;
      })}
    </div>
  </div>
);

// ──────────────────────────────────────────────────────────────────────────────
// Home Page
// ──────────────────────────────────────────────────────────────────────────────
export const Home = () => (
  <div className="animate-in fade-in duration-500">
    {/* Bento Grid */}
    <div className="p-4 md:p-8 pt-0 md:pt-0 pb-2 md:pb-4">
      {/* Header */}
      <div className="flex items-baseline gap-4 mb-4">
        <h1 className="text-2xl font-bold tracking-wide" style={{ letterSpacing: '0.04em' }}>
          首页
        </h1>
        <p className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest opacity-60">
          Command Center · Research Dashboard
        </p>
      </div>

      {/* Three Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6">
        {/* Module A: Latest Insights — full height left */}
        <div className="md:row-span-2">
          <LatestInsights />
        </div>
        {/* Module B: Bio & Status — right upper */}
        <BioPanel />
        {/* Module C: Quant Toolbox — right lower */}
        <QuantToolbox />
      </div>

      {/* Module D: Alpha-Link Panel — full width */}
      <div className="mt-6">
        <AlphaPanel />
      </div>
    </div>
  </div>
);
