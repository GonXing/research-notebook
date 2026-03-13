import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import alphaAvatar from '../assets/alpha_link_avatar.png';
import { Rss, RefreshCw, Cpu, TrendingUp } from 'lucide-react';

// ─── Quant Insights (no personal goals) ────────────────────────────────────
const INSIGHTS = [
  { type: 'QUANT WISDOM', text: 'The market can remain irrational longer than you can remain solvent. — Keynes' },
  { type: 'QUANT WISDOM', text: 'In God we trust. All others must bring data. — W. Edwards Deming' },
  { type: 'QUANT WISDOM', text: 'Far more money has been lost by investors preparing for corrections than has been lost in corrections themselves. — Peter Lynch' },
  { type: 'QUANT WISDOM', text: 'It is not whether you are right or wrong, but how much money you make when you are right. — George Soros' },
  { type: 'QUANT WISDOM', text: 'The stock market is a device for transferring money from the impatient to the patient. — Warren Buffett' },
  { type: 'QUANT WISDOM', text: 'Risk comes from not knowing what you are doing. — Warren Buffett' },
  { type: 'QUANT WISDOM', text: 'Price is what you pay. Value is what you get. — Warren Buffett' },
  { type: 'MARKET THOUGHT', text: '波动率是市场的DNA，不是风险本身——如何解读它，决定了你是猎手还是猎物。' },
  { type: 'MARKET THOUGHT', text: '因子投资的核心不在于发现因子，而在于理解为什么它能持续奏效，以及它何时会失效。' },
  { type: 'MARKET THOUGHT', text: '均值回归是市场最古老的法则，但"均值"本身也是时变的——这才是真正的挑战所在。' },
  { type: 'RESEARCH NOTE', text: '短期价格反转在A股显著成立：IC均值 ≈ -0.065，中性化后年化ICIR达 -2.05。' },
  { type: 'RESEARCH NOTE', text: '期权隐含波动率对未来实际波动率有前瞻性，但风险溢价因时变而需动态校准。' },
  { type: 'RESEARCH NOTE', text: '高频交易中的市场微观结构：买卖价差、订单流毒性与做市商利润的三角博弈。' },
];

interface NewsItem {
  title: string;
  pubDate: string;
  link: string;
}

// ─── Alpha Panel ────────────────────────────────────────────────────────────
export const AlphaPanel = () => {
  const [insightIndex, setInsightIndex] = useState(0);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [dots, setDots] = useState<{ x: number; y: number; r: number; delay: number }[]>([]);
  const controls = useAnimation();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Generate dot matrix once on mount
  useEffect(() => {
    const generated = Array.from({ length: 48 }, (_, i) => ({
      x: (i % 8) * 8,
      y: Math.floor(i / 8) * 8,
      r: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 2,
    }));
    setDots(generated);
  }, []);

  // Floating animation
  useEffect(() => {
    controls.start({
      y: [0, -5, 0],
      transition: { duration: 3.5, ease: 'easeInOut', repeat: Infinity },
    });
  }, [controls]);

  // Rotate insights every 4s
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setInsightIndex(i => (i + 1) % INSIGHTS.length);
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Fetch financial news via allorigins (more reliable CORS proxy)
  const fetchNews = async () => {
    setNewsLoading(true);
    try {
      const feedUrl = 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=^GSPC,^DJI,^IXIC&region=US&lang=en-US';
      // Try rss2json first, with a more cautious encoding
      const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
      const data = await res.json();
      
      if (data.status === 'ok' && data.items?.length) {
        setNews(data.items.slice(0, 5).map((item: any) => ({
          title: item.title,
          pubDate: new Date(item.pubDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          link: item.link,
        })));
      } else {
        throw new Error('RSS proxy returned no data');
      }
    } catch (err) {
      console.warn('Primary news fetch failed, trying fallback...', err);
      try {
        // Fallback: use allOrigins to get raw RSS then parse locally (basic)
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://finance.yahoo.com/news/rssindex')}`;
        const res = await fetch(proxyUrl);
        const data = await res.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        const items = Array.from(xmlDoc.querySelectorAll("item")).slice(0, 5);
        
        if (items.length > 0) {
          setNews(items.map(item => ({
            title: item.querySelector("title")?.textContent || "No Title",
            pubDate: "Latest",
            link: item.querySelector("link")?.textContent || "#",
          })));
        }
      } catch (fallbackErr) {
        console.error('All news fetch attempts failed:', fallbackErr);
      }
    } finally {
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000); // refresh every 5 mins
    return () => clearInterval(interval);
  }, []);

  const currentInsight = INSIGHTS[insightIndex];

  return (
    <div
      className="w-full rounded-xl overflow-hidden mt-4"
      style={{
        background: 'rgba(10,12,24,0.7)',
        border: '1px solid rgba(96,165,250,0.12)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex flex-col md:flex-row items-stretch min-h-[140px]">

        {/* ── Left: Avatar ─────────────────────────────────────────── */}
        <div
          className="relative flex flex-col items-center justify-center px-5 py-4 shrink-0"
          style={{
            background: 'linear-gradient(135deg, #0a0f1e 0%, #101a2e 100%)',
            borderRight: '1px solid rgba(96,165,250,0.08)',
            minWidth: '120px',
          }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(96,165,250,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.4) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }} />

          {/* Avatar orb */}
          <motion.div animate={controls} className="relative z-10 flex flex-col items-center gap-2">
            <div className="relative">
              {/* Breathing ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity }}
                className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.3) 0%, transparent 70%)', border: '1px solid rgba(96,165,250,0.3)' }}
              />
              {/* Avatar image */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden"
                style={{ boxShadow: '0 0 16px 4px rgba(234,179,8,0.3), 0 0 6px 2px rgba(96,165,250,0.4)' }}>
                <img src={alphaAvatar} alt="Alpha-Link" className="w-full h-full object-cover object-top" />
                {/* dot matrix overlay */}
                <svg width="56" height="56" viewBox="0 0 64 64" className="absolute inset-0 opacity-20">
                  {dots.map((d, i) => (
                    <motion.circle key={i} cx={d.x + 4} cy={d.y + 4} r={d.r} fill="#fff"
                      animate={{ opacity: [0.1, 0.9, 0.1] }}
                      transition={{ duration: 1.8 + d.delay, ease: 'easeInOut', repeat: Infinity, delay: d.delay }}
                    />
                  ))}
                </svg>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#EAB308] opacity-90">Alpha-Link</p>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse" />
                <span className="text-[9px] font-mono text-[#00FF9D] opacity-70">ONLINE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Center: Rotating Insight ─────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center px-5 py-4 border-b md:border-b-0 md:border-r"
          style={{ borderColor: 'rgba(96,165,250,0.08)' }}>
          <div className="flex items-center gap-1.5 mb-2">
            <Cpu className="w-3 h-3 text-[#60a5fa] opacity-60" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#60a5fa] opacity-60">Alpha Insight</span>
          </div>
          <motion.div
            key={insightIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-[9px] font-mono px-1.5 py-0.5 rounded mb-2 text-[#EAB308] border border-[rgba(234,179,8,0.25)] bg-[rgba(234,179,8,0.06)]">
              {currentInsight.type}
            </span>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {currentInsight.text}
            </p>
          </motion.div>

          {/* Progress dots */}
          <div className="flex gap-1 mt-3">
            {INSIGHTS.map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full transition-all duration-300"
                style={{ background: i === insightIndex ? '#60a5fa' : 'rgba(96,165,250,0.15)' }} />
            ))}
          </div>
        </div>

        {/* ── Right: Live News ─────────────────────────────────────── */}
        <div className="w-full md:w-64 shrink-0 flex flex-col px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Rss className="w-3 h-3 text-[#00FF9D] opacity-60" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#00FF9D] opacity-60">Market News</span>
            </div>
            <button
              onClick={fetchNews}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          {newsLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex flex-col gap-1">
                  <div className="h-2.5 w-full bg-white/5 rounded" />
                  <div className="h-2.5 w-3/4 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="space-y-2.5 overflow-hidden">
              {news.map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                  className="group flex flex-col gap-0.5 cursor-pointer">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-2.5 h-2.5 text-[#60a5fa] opacity-40 shrink-0" />
                    <p className="text-[10px] text-[var(--color-text-muted)] leading-snug group-hover:text-[var(--color-text-main)] transition-colors line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                  <span className="text-[8px] font-mono text-[var(--color-text-muted)] opacity-40 pl-4">{item.pubDate}</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2 opacity-40">
              <Rss className="w-5 h-5 text-[var(--color-text-muted)]" />
              <p className="text-[9px] font-mono text-[var(--color-text-muted)] text-center">暂无新闻<br/>点击刷新重试</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Keep old export for backward compatibility — renders nothing now
export const AlphaLink = () => null;
