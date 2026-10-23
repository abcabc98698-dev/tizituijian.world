# 梯子推荐网 (tizituijian.world)

<p align="center">
  <img src="docs/public/avatar.jpg" alt="梯子推荐网 Logo" width="120" style="border-radius: 50%; border: 3px solid #10b981;" />
</p>

<p align="center">
  <strong>面向知道梯子具体购买什么产品的用户，提供硬核选型、技术参数对比与购买决策的现代化静态知识库。</strong>
</p>

<p align="center">
  <a href="https://tizituijian.world/"><img src="https://img.shields.io/badge/官网-tizituijian.world-10b981?style=flat-square&logo=safari" alt="Website" /></a>
  <img src="https://img.shields.io/badge/VitePress-1.6.4-3b82f6?style=flat-square&logo=vite" alt="VitePress" />
  <img src="https://img.shields.io/badge/Vue-3.5-42b883?style=flat-square&logo=vue.js" alt="Vue" />
  <img src="https://img.shields.io/badge/Search-Pagefind-f59e0b?style=flat-square" alt="Pagefind" />
  <img src="https://img.shields.io/badge/SEO_Score-98.2_%2F_100-emerald?style=flat-square&logo=google" alt="SEO Score" />
  <img src="https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square" alt="License" />
</p>

---

## 📖 项目简介 (Overview)

**tizituijian.world（梯子推荐网）** 是一个针对跨境网络加速、代理协议安全与网络服务商可靠性评测的独立技术站点。

不同于充斥着营销套话与虚假测速截图的泛联盟站点，本项目基于真实的网络工程标准构建，涵盖 **121 篇万字级专题大系与长尾实战指南**，自建分布式网络测试环境，为跨国企业开发、学术科研及多媒体娱乐用户提供具备真实参考价值的选型罗盘。

---

## ✨ 核心特性 (Key Features)

- 🧭 **蜂巢式内容拓扑架构 (Topic Cluster)**
  - **八大一级专题**：梯子推荐、找梯子罗盘、便宜梯子精选、机场推荐、免费资源真相、深度评测实验室、全平台客户端教程、避坑防骗百科。
  - **42 家品牌检索库**：包含光速云、飞猫云、微风网络、暮光加速等品牌实测数据，支持协议、倍率、价格与测速动态检索。
- 🔬 **严谨的 E-E-A-T 权威评测体系**
  - **全站专家作者署名**：CCIE 认证网络架构师领衔，全量挂载 `<AuthorBox />` 资质背书与物理机房测试环境（上海电信 CN2 / 北京联通 9929 / 广州移动 CMIN2）。
  - **合规透明度页面**：内建独立的关于我们 (`/about`)、评测方法论 (`/methodology`)、商业推广披露白皮书 (`/disclosure`)、隐私政策 (`/privacy`) 与服务条款 (`/terms`)。
- 🚀 **生产级技术 SEO 基础设施**
  - **自引用 Canonical**：122 个 HTML 页面全自动注入自引用规范 URL，杜绝跨参/跨镜像权重分散。
  - **结构化数据 (JSON-LD)**：全站输出 355+ 个合法 Schema 节点，包含 `BreadcrumbList`、`TechArticle`、`CollectionPage`、`WebSite` 及真实提取的 `FAQPage`。
  - **Sitemap 增量同步**：所有收录 URL 均携带精准 `lastmod`、`changefreq` 与 `priority`。
  - **极速性能**：单页面 JS 切片均低于 50KB，全站纯静态直出，移动端 Viewport 完美适配，图片 0 空 Alt。
- 🔍 **Pagefind 毫秒级全静态离线全文搜索**
  - 无需第三方云端检索服务，本地构建时全量提取 7,800+ 核心专业词汇，支持即时拼音/英汉双向联想。

---

## 📂 目录架构 (Repository Structure)

```text
tizituijian.world/
├── docs/                           # VitePress 文档根目录
│   ├── .vitepress/                 # VitePress 核心工程配置
│   │   ├── config.mts              # 站点元数据、SEO 注入钩子、Sitemap 与导航侧边栏
│   │   └── theme/                  # 品牌化主题定制
│   │       ├── components/         # 交互组件 (AuthorBox, AffiliateNotice, BrandFilter 等)
│   │       ├── custom.css          # 全局极简白与现代响应式样式
│   │       └── index.ts            # 主题布局挂载与组件注册
│   ├── public/                     # 静态公共资源
│   │   ├── avatar.jpg              # 品牌 Logo / 专家头像
│   │   ├── robots.txt              # 规范搜索引擎爬虫规则
│   │   └── .htaccess               # Apache 伪静态、HTTPS 强制跳转与 HSTS 安全响应头
│   ├── tizi-tuijian/               # 梯子推荐知识图谱与选型大系
│   ├── zhao-tizi/                  # 按需找梯子罗盘 (预算/设备/场景/协议)
│   ├── pianyi-tizi/                # 便宜梯子专区 (10元档/20元档/小流量轻量包)
│   ├── jichang-tuijian/            # 机场推荐大系 (IPLC专线/大带宽/老牌保活)
│   ├── mianfei-jichang/            # 免费机场与试用真相 (安全警示/低价替代)
│   ├── tizi-pingce/                # 深度评测实验室 (晚高峰测速/AI解锁/丢包率监控)
│   ├── jiaocheng/                  # 全平台使用教程 (Windows/Mac/iOS/Android/软路由)
│   ├── bikeng/                     # 避坑指南 (跑路信号/倍率刺客/年付陷阱/防骗百科)
│   ├── brands/                     # 42 家机场品牌独立评测页面与数据库
│   ├── about.md                    # 关于我们与实验室介绍
│   ├── methodology.md              # 评测方法论与实验室标准
│   ├── disclosure.md               # 商业推广合规披露白皮书
│   ├── privacy.md                  # 隐私政策与数据安全声明
│   ├── terms.md                    # 服务条款与免责声明
│   └── index.md                    # 门户首页选型大矩阵
├── scripts/                        # 自动化工程与审计脚本
│   └── audit/                      # SEO 自动化巡检与合规测试套件
├── package.json                    # 项目依赖与 Scripts
├── .gitignore                      # Git 忽略规则
└── README.md                       # 项目自述文件
```

---

## 🛠️ 快速上手 (Quick Start)

### 环境依赖
- [Node.js](https://nodejs.org/) v18.0.0 或更高版本
- [npm](https://www.npmjs.com/) 或 pnpm / yarn

### 1. 安装项目依赖
```bash
git clone https://github.com/abcabc98698-dev/tizituijian.world.git
cd tizituijian.world
npm install
```

### 2. 启动本地开发服务器
```bash
npm run dev
```
开发服务器将默认运行在 `http://localhost:5173/`。

### 3. 生产环境构建与全静态化导出
```bash
npm run build
```
构建成功后，静态文件及 Pagefind 离线检索索引将输出至 `docs/.vitepress/dist/` 目录。

### 4. 本地生产产物预览
```bash
npm run preview
```

---

## 🚀 部署指引 (Deployment)

### Apache 静态部署 (推荐)
构建产物 `docs/.vitepress/dist/` 已自带 `.htaccess` 配置文件，包含以下生产级特性：
- Clean URLs（无需 `.html` 后缀直接访问）
- 强制 HTTP 301 重定向至 HTTPS
- `Strict-Transport-Security` (HSTS) 安全响应头
- 针对静态 JS/CSS 的 1 年长效缓存与 HTML 即时验证

### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name tizituijian.world www.tizituijian.world;
    return 301 https://tizituijian.world$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tizituijian.world;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    root /var/www/tizituijian.world/docs/.vitepress/dist;
    index index.html;

    # 启用 Clean URLs
    location / {
        try_files $uri $uri.html $uri/ /404.html;
    }

    # 静态资产长效缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # 安全响应头
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
}
```

---

## ⚖️ 免责声明与合规准则 (Disclaimer)

1. **纯学术与网络工程研究**：本项目发布的所有文章、协议测试与数据模型均面向计算机网络通信、分布式代理协议与拥塞控制技术的学术交流与技术探讨。
2. **非网络服务提供商**：本项目不销售、不架设、亦不运营任何代理服务器网关。用户须严格遵守所在司法管辖区的法律法规，严禁将技术用于任何非法用途。
3. **商业推广透明度声明**：部分外链含有赞助合作代码（Affiliate Code）。商业佣金绝不转嫁给用户，绝不影响独立客观的测试评级（详见 [`/disclosure`](https://tizituijian.world/disclosure)）。

---

## 📄 开源许可证 (License)

本项目采用 [MIT License](LICENSE) 授权。欢迎提出 PR 与 Issue 共同完善评测数据！
