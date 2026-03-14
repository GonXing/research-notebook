# Jasin's Research Notebook

一个面向量化研究与个人知识管理的 React 个人门户项目，用来统一展示研究笔记、实验记录、学习路径与行情信息。

## 项目定位

这个项目不是通用博客模板，而是一个偏研究工作流的个人站点，核心目标包括：

- 展示量化研究笔记与方法论沉淀
- 管理计算机实验、MFE 申请路径与日常随记
- 对接本地 Obsidian 写作流程
- 在前端页面中同步展示市场行情与研究状态

## 技术栈

- 前端框架：React + TypeScript + Vite
- 样式系统：Tailwind CSS
- 动画：Framer Motion
- 图标：Lucide React
- Markdown 渲染：React Markdown
- 数学公式：KaTeX
- 代码高亮：highlight.js

## 主要功能

- 多栏目笔记展示
- 基于本地 `posts/` 目录的 Markdown 内容读取
- 支持 Obsidian 常见写作方式
- 支持 KaTeX 数学公式与代码高亮
- 支持私密栏目密码访问控制
- 全局市场行情条展示
- 宽屏优化的研究阅读界面

## 目录结构

```text
personal-portfolio/
├── posts/                  # Markdown 笔记内容
├── public/                 # 静态资源
├── scripts/                # 部署脚本
├── src/
│   ├── components/         # 页面与功能组件
│   ├── pages/              # 路由页面
│   ├── utils/              # 数据读取与工具函数
│   └── index.css           # 全局样式
├── Deploy.command          # 一键部署入口
└── README.md
```

## 笔记写作流程

日常内容维护以 `posts/` 为核心：

1. 在对应分类目录下新增或修改 `.md` 文件
2. 使用 Front Matter 补充标题、日期、标签等信息
3. 本地预览或直接执行部署脚本
4. 刷新网页查看更新结果

项目已经内置对隐藏目录、模板目录等无效内容的过滤逻辑，避免将 Obsidian 辅助文件直接展示到网站上。

## 本地开发

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

构建生产版本：

```bash
npm run build
```

## 部署方式

项目提供了一套自动化部署脚本：

- 入口文件：`Deploy.command`
- 实际脚本：`scripts/deploy.sh`

部署流程会自动执行：

1. 读取服务器配置与密钥
2. 本地构建前端产物
3. 将 `dist/`、`posts/`、脚本文件等同步到服务器

如果你已经配置好 `.research_notebook_secrets.env`，通常只需要运行：

```bash
./Deploy.command
```

## 数据与安全说明

- `posts/` 中的研究笔记可作为网站内容源
- 私密栏目通过前端密码门控进行访问限制
- `.gitignore` 已配置忽略敏感文件与不需要纳入版本控制的内容
- 部署脚本已避免本地旧行情数据覆盖服务器实时数据

## 后续方向

- 优化大规模笔记下的加载性能
- 增加更细粒度的文章导航与目录能力
- 持续增强量化研究展示模块与自动化数据看板

