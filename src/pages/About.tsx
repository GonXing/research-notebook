export const About = () => {
  return (
    <article className="prose prose-invert max-w-none animate-in fade-in duration-500">
      {/* 头部：更具个人品牌感 */}
      <header className="mb-12 border-b border-[var(--color-border-dark)] pb-6">
        <h1 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Jasin
        </h1>
        <p className="text-[var(--color-text-muted)] font-mono text-sm tracking-widest uppercase">
          Quant Researcher & Full-Stack Developer Apprentice
        </p>
      </header>

      {/* 个人简介：突出双学位背景的独特性 */}
      <section className="mb-10">
        <h2>背景与身份</h2>
        <p>
          你好，我是 <strong>Jasin</strong>。目前正处于一段充满挑战的旅程中：在<strong>西南财经大学（SWUFE）</strong>攻读金融学，并同步在<strong>电子科技大学（UESTC）</strong>修读计算机科学。
        </p>
        <p>
          这种“双核驱动”的背景让我习惯于用两种视角审视世界：用金融逻辑去理解市场的非理性与风险溢价，用计算机科学的严谨去构建高效、可扩展的交易工具。我的目标是将深层的数据挖掘与前沿算法注入实盘交易。
        </p>
      </section>

      {/* 核心理念：增加深度和个人品味 */}
      <section className="mb-10">
        <h2>研究与思考</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="p-4 border border-[var(--color-border-dark)] rounded-lg bg-white/5">
            <h3 className="text-lg mt-0">量化逻辑</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              我不相信存在永恒的圣杯，但我相信通过“图神经网络（GNN）”捕捉供应链中的信息流转，能够发现传统多因子模型难以触及的跨周期动量。
            </p>
          </div>
          <div className="p-4 border border-[var(--color-border-dark)] rounded-lg bg-white/5">
            <h3 className="text-lg mt-0">工程哲学</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              代码不只是工具，它是思想的延伸。从 C++ 的内存管理到 Rust 的所有权模型，我追求极致的运行效率与系统稳定性，这在延迟敏感型交易中至关重要。
            </p>
          </div>
        </div>
      </section>

      {/* 技术栈：分类更细致，展现专业度 */}
      <section className="mb-10">
        <h2>技术图谱</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-bold uppercase text-[var(--color-accent)]">Finance & Math</h4>
            <ul className="text-sm list-none p-0">
              <li>实证资产定价</li>
              <li>随机过程 / 偏微分方程</li>
              <li>多因子模型 (Alpha101)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase text-[var(--color-accent)]">Data Science</h4>
            <ul className="text-sm list-none p-0">
              <li>Python (Pandas, PyTorch)</li>
              <li>R (Tidyverse)</li>
              <li>Graph Neural Networks</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase text-[var(--color-accent)]">Engineering</h4>
            <ul className="text-sm list-none p-0">
              <li>Modern C++ / Rust</li>
              <li>Linux Kernel / Docker</li>
              <li>Low-Latency Design</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 兴趣拓展：让人物形象生动 */}
      <section className="mb-10">
        <h2>工作之外</h2>
        <p>
          当我不在调试回测系统或推导公式时，我可能在：
        </p>
        <ul className="grid grid-cols-2 gap-2 list-none p-0 text-sm">
          <li>📈 研究 A 股与美股的实盘博弈逻辑</li>
          <li>💻 贡献开源项目或优化自己的开发环境</li>
          <li>☕ 寻找城市里最安静的咖啡馆阅读研报</li>
          <li>🌌 思考如何将复杂系统理论应用到社会学科</li>
        </ul>
      </section>

      {/* 结语 */}
      <footer className="mt-16 pt-8 border-t border-[var(--color-border-dark)] text-center italic text-[var(--color-text-muted)]">
        “Stay hungry, stay rigorous.” —— 欢迎通过邮箱或社交媒体与我探讨量化技术与学术申请。
      </footer>
    </article>
  );
};