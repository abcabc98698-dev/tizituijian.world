import fs from 'fs';

const html = fs.readFileSync('docs/.vitepress/dist/index.html', 'utf8');

const allLinks = [];
const linkRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gis;
let match;

while ((match = linkRegex.exec(html)) !== null) {
  allLinks.push({ href: match[1], text: match[2].replace(/<[^>]*>/g, '').trim() });
}

console.log('=== 导航与链接静态可爬取性 (Raw SSR HTML) ===');
console.log(`全站首页静态 HTML 中共包含 <a> 超链接数: ${allLinks.length}`);

const keyNavPaths = [
  '/',
  '/tizi-tuijian/',
  '/zhao-tizi/',
  '/pianyi-tizi/',
  '/jichang-tuijian/',
  '/mianfei-jichang/',
  '/tizi-pingce/',
  '/jiaocheng/',
  '/bikeng/',
  '/brands/',
  '/about',
  '/methodology',
  '/disclosure',
  '/privacy',
  '/terms'
];

for (const target of keyNavPaths) {
  const found = allLinks.some(l => l.href === target || l.href === target + 'index.html');
  console.log(`核心入口 [${target.padEnd(20)}] 静态 <a> 标签直达: ${found ? 'PASS ✅' : 'MISSING ❌'}`);
}
