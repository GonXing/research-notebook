import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, TrendingDown, Clock, BarChart2 } from 'lucide-react';

// Mock backtest data mimicking S&P 500/Alpha Factor performance
const mockData = Array.from({ length: 100 }, (_, i) => {
  const date = new Date(2023, 0, 1);
  date.setDate(date.getDate() + i * 5);
  
  return {
    date: date.toISOString().split('T')[0],
    portfolio: 0,
    benchmark: 0,
  };
}).reduce((acc: any[], curr, i) => {
  const prevPort = i === 0 ? 10000 : acc[i - 1].portfolio;
  const prevBench = i === 0 ? 10000 : acc[i - 1].benchmark;
  
  const portReturn = (Math.random() - 0.45) * 0.02; // alpha!
  const benchReturn = (Math.random() - 0.48) * 0.015;
  
  acc.push({
    ...curr,
    portfolio: prevPort * (1 + portReturn),
    benchmark: prevBench * (1 + benchReturn),
  });
  return acc;
}, []);

const StatCard = ({ title, value, subValue, isPositive, icon: Icon }: any) => (
  <div className="terminal-panel p-4 flex flex-col">
    <div className="flex justify-between items-start mb-2">
      <span className="text-[var(--color-text-muted)] font-mono text-sm uppercase">{title}</span>
      <Icon className="w-5 h-5 text-[var(--color-text-muted)] opacity-50" />
    </div>
    <div className="text-2xl font-mono font-medium text-[var(--color-text-main)] mb-1">
      {value}
    </div>
    <div className={`text-sm font-mono ${isPositive ? 'text-[var(--color-brand-green)]' : 'text-[var(--color-brand-red)]'}`}>
      {isPositive ? '+' : ''}{subValue}
    </div>
  </div>
);

export const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('1Y');
  
  const currentPortfolio = mockData[mockData.length - 1].portfolio;
  const initialPortfolio = mockData[0].portfolio;
  const totalReturn = ((currentPortfolio - initialPortfolio) / initialPortfolio) * 100;
  
  return (
    <section id="dashboard" className="py-20 bg-[var(--color-bg-dark)] border-t border-[var(--color-border-dark)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--color-border-dark)] pb-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Alpha Signal Backtest</h2>
            <p className="text-[var(--color-text-muted)] font-mono text-sm uppercase flex items-center">
              <Activity className="w-4 h-4 mr-2 text-[var(--color-brand-green)]" />
              Strategy: Statistical Arbitrage • Universe: S&P 500
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            {['1M', '3M', 'YTD', '1Y', 'ALL'].map(t => (
              <button 
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 font-mono text-xs border ${
                  timeframe === t 
                    ? 'border-[var(--color-brand-orange)] text-[var(--color-brand-orange)] bg-[var(--color-brand-orange)]/10' 
                    : 'border-[var(--color-border-dark)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:border-[var(--color-text-muted)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Return" 
            value={`${totalReturn.toFixed(2)}%`} 
            subValue="vs. 14.2% Bench" 
            isPositive={totalReturn > 14.2}
            icon={TrendingUp}
          />
          <StatCard 
            title="Sharpe Ratio" 
            value="2.14" 
            subValue="Risk Free: 4.2%" 
            isPositive={true}
            icon={BarChart2}
          />
          <StatCard 
            title="Max Drawdown" 
            value="-8.4%" 
            subValue="Recovery: 42d" 
            isPositive={false}
            icon={TrendingDown}
          />
          <StatCard 
            title="Win Rate" 
            value="54.2%" 
            subValue="Trades: 1,424" 
            isPositive={true}
            icon={Clock}
          />
        </div>

        <div className="terminal-panel p-4 h-[500px]">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="font-mono text-sm uppercase text-[var(--color-text-muted)]">Cumulative Returns</h3>
            <div className="flex space-x-4 font-mono text-xs">
              <span className="flex items-center text-[var(--color-brand-orange)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-orange)] mr-2"></span>
                Strategy
              </span>
              <span className="flex items-center text-[var(--color-brand-blue)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] mr-2"></span>
                Benchmark
              </span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-dark)" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-text-muted)" 
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12, fontFamily: 'monospace' }}
                tickMargin={10}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="var(--color-text-muted)"
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12, fontFamily: 'monospace' }}
                tickFormatter={(val) => `$${(val / 1000).toFixed(1)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-surface-dark)', 
                  borderColor: 'var(--color-border-dark)',
                  color: 'var(--color-text-main)',
                  fontFamily: 'monospace'
                }}
                itemStyle={{ fontFamily: 'monospace' }}
                formatter={(value: any) => [`$${Number(value).toFixed(2)}`, '']}
                labelStyle={{ color: 'var(--color-text-muted)', marginBottom: '4px' }}
              />
              <Line 
                type="monotone" 
                dataKey="portfolio" 
                stroke="var(--color-brand-orange)" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 4, fill: 'var(--color-bg-dark)', stroke: 'var(--color-brand-orange)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="benchmark" 
                stroke="var(--color-brand-blue)" 
                strokeWidth={1.5} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
