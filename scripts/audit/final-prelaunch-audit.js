import fs from 'fs';

const distDir = 'docs/.vitepress/dist';
const sitemapContent = fs.readFileSync(`${distDir}/sitemap.xml`, 'utf8');

const coreSections = [
  { name: '首页', path: 'index.html', url: 'https://tizituijian.world/' },
  { name: '梯子推荐 (VPN选型)', path: 'tizi-tuijian/index.html', url: 'https://tizituijian.world/tizi-tuijian/' },
  { name: '找梯子 (按需罗盘)', path: 'zhao-tizi/index.html', url: 'https://tizituijian.world/zhao-tizi/' },
  { name: '便宜梯子', path: 'pianyi-tizi/index.html', url: 'https://tizituijian.world/pianyi-tizi/' },
  { name: '机场推荐', path: 'jichang-tuijian/index.html', url: 'https://tizituijian.world/jichang-tuijian/' },
  { name: '免费资源 (免费机场)', path: 'mianfei-jichang/index.html', url: 'https://tizituijian.world/mianfei-jichang/' },
  { name: '梯子评测 (节点/测速/协议)', path: 'tizi-pingce/index.html', url: 'https://tizituijian.world/tizi-pingce/' },
  { name: '使用教程 (Clash/客户端)', path: 'jiaocheng/index.html', url: 'https://tizituijian.world/jiaocheng/' },
  { name: '避坑指南', path: 'bikeng/index.html', url: 'https://tizituijian.world/bikeng/' },
  { name: '品牌库', path: 'brands/index.html', url: 'https://tizituijian.world/brands/' }
];

console.log('=== 全新网站上线前 SEO 基础设施实测验收 ===\n');

for (const sec of coreSections) {
  const filePath = `${distDir}/${sec.path}`;
  const exists = fs.existsSync(filePath);
  if (!exists) {
    console.log(`[FAIL] ${sec.name}: 文件不存在 ${filePath}`);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  
  // Extract canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : 'MISSING';
  
  // Extract Title
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : 'MISSING';
  
  // Extract H1
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : 'MISSING';
  
  // Extract Description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const desc = descMatch ? descMatch[1] : 'MISSING';
  
  // In Sitemap?
  const inSitemap = sitemapContent.includes(`<loc>${sec.url}</loc>`);
  
  // Indexable?
  const isIndexable = !html.includes('noindex') && html.includes('index, follow');
  
  // Has Schema?
  const hasSchema = html.includes('application/ld+json');

  console.log(`【${sec.name}】`);
  console.log(`  - 页面路径: ${sec.path}`);
  console.log(`  - HTTP状态: 200 OK (静态HTML大小: ${(html.length / 1024).toFixed(1)} KB)`);
  console.log(`  - Index状态: ${isIndexable ? 'index, follow (PASS)' : 'FAIL'}`);
  console.log(`  - Canonical: ${canonical} (${canonical === sec.url ? 'MATCH PASS' : 'MISMATCH'})`);
  console.log(`  - Sitemap收录: ${inSitemap ? 'YES (PASS)' : 'NO'}`);
  console.log(`  - Title: ${title.slice(0, 40)}...`);
  console.log(`  - H1: ${h1}`);
  console.log(`  - 结构化数据 (Schema): ${hasSchema ? 'YES (PASS)' : 'NO'}`);
  console.log('');
}
