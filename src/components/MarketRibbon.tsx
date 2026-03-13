import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketIndex {
  symbol: string;
  label: string;
  price: number;
  change: number;
  change_pct: number;
  direction: 'up' | 'down';
}
interface MarketData {
  updated_at: string;
  indices: Record<string, MarketIndex>;
}

export const MarketRibbon = () => {
  const [data, setData] = useState<MarketData | null>(null);
  const [pulse, setPulse] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const r = await globalThis.fetch('/data/market_indices.json', { cache: 'no-store' });
      if (r.ok) setData(await r.json());
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    fetchData();
    timerRef.current = setInterval(fetchData, 60_000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [fetchData]);

  // Breathing pulse every second
  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 1000);
    return () => clearInterval(t);
  }, []);

  const indices = data ? Object.values(data.indices) : [];

  return (
    <div
      className="w-full flex items-center justify-center px-6 py-2 overflow-x-auto shrink-0 gap-8"
      style={{
        background: 'rgba(10,10,15,0.85)',
        borderBottom: '1px solid rgba(96,165,250,0.12)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Indices row */}
      <div className="flex items-center gap-6 min-w-0">
        {indices.length === 0 ? (
          [1, 2, 3].map(i => (
            <div key={i} className="flex gap-2 items-center animate-pulse">
              <div className="h-3 w-10 bg-white/10 rounded" />
              <div className="h-3 w-14 bg-white/10 rounded" />
            </div>
          ))
        ) : (
          indices.map(idx => (
            <div key={idx.symbol} className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono font-semibold text-[var(--color-text-main)] opacity-70">
                {idx.symbol}
              </span>
              <span className="text-[12px] font-mono font-bold text-[var(--color-text-main)]">
                {idx.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span
                className="text-[11px] font-mono flex items-center gap-0.5"
                style={{ color: idx.direction === 'up' ? '#00FF9D' : '#f87171' }}
              >
                {idx.direction === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {idx.change_pct >= 0 ? '+' : ''}{idx.change_pct.toFixed(2)}%
              </span>
            </div>
          ))
        )}
      </div>

      {/* Timestamp */}
      <div className="flex items-center gap-1.5 shrink-0 opacity-60">
        <motion.span
          animate={{ opacity: pulse ? 0.3 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-1.5 h-1.5 rounded-full inline-block"
          style={{ background: '#00FF9D' }}
        />
        <span className="text-[9px] font-mono text-[var(--color-text-muted)]">
          {data
            ? `UPDATED ${new Date(data.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
            : 'FETCHING...'}
        </span>
      </div>
    </div>
  );
};
