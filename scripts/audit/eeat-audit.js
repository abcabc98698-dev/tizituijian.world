import fs from 'fs';
import path from 'path';

console.log('=== 三、E-E-A-T 健康检查报告 ===\n');

// 3.1 作者信息 (检查渲染后的 HTML 产物与 Markdown 源码)
console.log('--- 3.1 作者署名与资质审计 ---');
function getAllHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (file.endsWith('.html') && file !== '404.html') {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles('docs/.vitepress/dist');
let htmlWithAuthor = 0;
let htmlWithoutAuthor = 0;

htmlFiles.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  // Check for rendered AuthorBox / E-E-A-T credentials in HTML
  if (c.includes('author-eeat-box') || c.includes('梯子选型与网络安全评测组') || c.includes('CCIE')) {
    htmlWithAuthor++;
  } else {
    // Exclude home page
    if (!f.endsWith('index.html') || f.includes('\\') || f.includes('/')) {
      htmlWithoutAuthor++;
    }
  }
});

console.log(`全站渲染 HTML 页面数 (除404): ${htmlFiles.length}`);
console.log(`包含专家作者资质 (AuthorBox & Credentials) 的页面数: ${htmlWithAuthor}`);
console.log(`缺少专家作者资质的页面数: ${htmlWithoutAuthor}`);

// 3.2 信任信号页面检测
console.log('\n--- 3.2 独立信任信号页面检测 ---');
const trustPages = [
  { name: '关于我们 / 团队介绍', path: 'docs/about.md', alt: 'docs/about/index.md' },
  { name: '评测方法论 (Methodology)', path: 'docs/methodology.md', alt: 'docs/pingce-fangfa.md' },
  { name: '隐私政策 (Privacy Policy)', path: 'docs/privacy.md', alt: 'docs/privacy-policy.md' },
  { name: '服务条款 (Terms of Service)', path: 'docs/terms.md', alt: 'docs/terms-of-service.md' },
  { name: '免责声明与推广披露 (Affiliate Disclosure)', path: 'docs/disclosure.md', alt: 'docs/affiliate-disclosure.md' }
];

trustPages.forEach(p => {
  const exists = fs.existsSync(p.path) || (p.alt && fs.existsSync(p.alt));
  console.log(`  - ${p.name}: ${exists ? '已存在 (PASS)' : '缺失 (FAIL / NEED CREATION)'}`);
});

// 3.3 数据来源与测速透明度
console.log('\n--- 3.3 品牌数据透明度与测试口径 ---');
const brandsJsonPath = 'data/brands.json';
if (fs.existsSync(brandsJsonPath)) {
  const brands = JSON.parse(fs.readFileSync(brandsJsonPath, 'utf8'));
  console.log(`Brand 数据库收录品牌数: ${brands.length}`);
  const measured = brands.filter(b => b.dataStatus === 'measured');
  const historical = brands.filter(b => b.dataStatus === 'historical');
  const unverified = brands.filter(b => b.dataStatus === 'unverified' || !b.dataStatus);
  console.log(`  - 明确标注实测 (measured): ${measured.length}`);
  console.log(`  - 标注历史归档 (historical): ${historical.length}`);
  console.log(`  - 待核实/无状态 (unverified): ${unverified.length}`);
}
