import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';

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

export const MarketDashboard = () => {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const resp = await fetch('/data/market_indices.json', { cache: 'no-store' });
      if (resp.ok) {
        const json = await resp.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to fetch market data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000 * 60 * 5); // Refresh every 5m locally
    return () => clearInterval(interval);
  }, []);

  if (!data && !loading) return null;

  return (
    <div className="px-4 py-3 bg-[var(--color-surface-dark)]/50 border-t border-b border-[var(--color-border-dark)]/50 mb-4 overflow-hidden">
      <div className="flex items-center justify-between mb-2 opacity-60">
        <span className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
          <RefreshCcw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          Market Indices
        </span>
        {data && (
          <span className="text-[9px] font-mono">
            {new Date(data.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      <div className="space-y-2.5">
        {loading && !data ? (
          <div className="h-20 animate-pulse bg-[var(--color-bg-dark)]/50 rounded" />
        ) : (
          Object.values(data?.indices || {}).map((index) => (
            <div key={index.symbol} className="flex items-center justify-between group">
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-[var(--color-text-main)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                  {index.symbol}
                </span>
                <span className="text-[9px] text-[var(--color-text-muted)]">
                  {index.label.split('(')[0]}
                </span>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-mono text-[var(--color-text-main)]">
                  {index.price.toFixed(2)}
                </span>
                <div className={`flex items-center gap-1 text-[9px] font-mono ${
                  index.direction === 'up' ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {index.direction === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {index.change_pct >= 0 ? '+' : ''}{index.change_pct.toFixed(2)}%
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
