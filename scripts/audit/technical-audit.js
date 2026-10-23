import fs from 'fs';
import path from 'path';

function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getHtmlFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles('docs/.vitepress/dist');
console.log('=== 技术 SEO 自动化审计报告 ===\n');
console.log(`扫描 HTML 文件总数: ${htmlFiles.length}`);

// 1.2 Canonical 与 Noindex
let canonicalCount = 0;
let canonicalMissing = [];
let canonicalWrongDomain = [];
let noindexCount = 0;
let noindexFiles = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative('docs/.vitepress/dist', file).replace(/\\/g, '/');

  // Regex for canonical link
  const match = content.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
                content.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);

  if (match) {
    canonicalCount++;
    const href = match[1];
    if (!href.startsWith('https://tizituijian.world')) {
      canonicalWrongDomain.push({ file: rel, href });
    }
  } else {
    canonicalMissing.push(rel);
  }

  // Check noindex in meta or text
  if (/<meta\s+[^>]*content=["'][^"']*noindex[^"']*["']/i.test(content) ||
      /<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["']/i.test(content)) {
    noindexCount++;
    noindexFiles.push(rel);
  }
});

console.log(`[1.2 Canonical] 包含 canonical 的页面: ${canonicalCount} / ${htmlFiles.length}`);
console.log(`[1.2 Canonical] 缺失 canonical 的页面数: ${canonicalMissing.length}`);
if (canonicalMissing.length > 0) {
  console.log(`   示例缺失页面: ${canonicalMissing.slice(0, 5).join(', ')}`);
}
console.log(`[1.2 Canonical] 域名异常/非正式域名: ${canonicalWrongDomain.length}`);

console.log(`[1.2 Noindex] 存在 noindex 标签的页面数: ${noindexCount}`);
if (noindexFiles.length > 0) {
  console.log(`   noindex 页面清单: ${noindexFiles.join(', ')}`);
}

// 1.3 Sitemap 健康度
console.log('\n--- 1.3 Sitemap 检查 ---');
const sitemapPath = 'docs/.vitepress/dist/sitemap.xml';
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const lastmods = [...sitemapContent.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(m => m[1]);
  
  console.log(`Sitemap 文件存在: 是 (${sitemapPath})`);
  console.log(`Sitemap 收录 URL 总数: ${urls.length}`);
  
  const wrongDomainSitemap = urls.filter(u => !u.startsWith('https://tizituijian.world'));
  console.log(`Sitemap 非正式域名 URL: ${wrongDomainSitemap.length}`);
  
  const has404InSitemap = urls.some(u => u.includes('404'));
  console.log(`Sitemap 是否包含 404 页面: ${has404InSitemap}`);
  
  const duplicates = urls.filter((item, index) => urls.indexOf(item) !== index);
  console.log(`Sitemap 重复 URL 数量: ${duplicates.length}`);
  
  console.log(`Sitemap 带有 lastmod 的条目数: ${lastmods.length} / ${urls.length}`);
  if (lastmods.length > 0) {
    console.log(`示例 lastmod 时间戳: ${lastmods[0]}`);
  }
} else {
  console.log(`Sitemap 文件未找到!`);
}

// 1.4 URL 规范
console.log('\n--- 1.4 URL 规范 ---');
let upperCaseUrls = [];
let chineseUrls = [];
let paramUrls = [];

htmlFiles.forEach(file => {
  const rel = path.relative('docs/.vitepress/dist', file).replace(/\\/g, '/');
  if (/[A-Z]/.test(rel)) {
    upperCaseUrls.push(rel);
  }
  if (/[\u4e00-\u9fa5]/.test(rel)) {
    chineseUrls.push(rel);
  }
  if (rel.includes('?')) {
    paramUrls.push(rel);
  }
});

console.log(`含大写字母的 URL 数量: ${upperCaseUrls.length}`);
console.log(`含中文字符的 URL 数量: ${chineseUrls.length}`);
console.log(`含参数的 URL 数量: ${paramUrls.length}`);

// 1.6 安全响应头与 HTTPS
console.log('\n--- 1.6 HTTPS 与安全配置 ---');
const htaccessPath = 'docs/public/.htaccess';
if (fs.existsSync(htaccessPath)) {
  const htContent = fs.readFileSync(htaccessPath, 'utf8');
  console.log('检测到 .htaccess 安全响应头:');
  const headers = ['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy'];
  headers.forEach(h => {
    console.log(`  - ${h}: ${htContent.includes(h) ? '已配置 (PASS)' : '未配置 (FAIL)'}`);
  });
  console.log(`  - HSTS (Strict-Transport-Security): ${htContent.includes('Strict-Transport-Security') ? '已配置 (PASS)' : '未配置 (OPTIONAL/MISSING)'}`);
}
