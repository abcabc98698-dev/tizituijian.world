import fs from 'fs';
import path from 'path';

console.log('=== 四、联盟链接与商业化合规审计报告 ===\n');

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
let totalOutboundLinks = 0;
let totalAffiliateLinks = 0;
let compliantAffiliateLinks = 0;
let nonCompliantLinks = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative('docs/.vitepress/dist', file).replace(/\\/g, '/');

  // Match all <a> tags with http/https
  const aMatches = content.matchAll(/<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi);
  for (const match of aMatches) {
    const fullTag = match[0];
    const url = match[1];

    // Check if external (not tizituijian.world)
    if (!url.includes('tizituijian.world') && !url.includes('localhost')) {
      totalOutboundLinks++;

      // Identify if affiliate/commercial link
      const isAff = url.includes('aff') || url.includes('code=') || url.includes('register') ||
                    url.includes('ref=') || url.includes('invite') || url.includes('gsyvip') ||
                    url.includes('flycat') || url.includes('breezenet') || url.includes('twilight');

      if (isAff) {
        totalAffiliateLinks++;
        const hasNofollow = /rel=["'][^"']*nofollow[^"']*["']/i.test(fullTag);
        const hasSponsored = /rel=["'][^"']*sponsored[^"']*["']/i.test(fullTag);
        const hasNoopener = /rel=["'][^"']*noopener[^"']*["']/i.test(fullTag);

        if (hasNofollow && hasSponsored && hasNoopener) {
          compliantAffiliateLinks++;
        } else {
          nonCompliantLinks.push({ file: rel, url, fullTag });
        }
      }
    }
  }
});

console.log(`全站 HTML 扫描总外链数: ${totalOutboundLinks}`);
console.log(`识别为商业推广/返利链接 (Affiliate Links): ${totalAffiliateLinks}`);
console.log(`完全合规链接 (含 nofollow + sponsored + noopener): ${compliantAffiliateLinks}`);
console.log(`未合规推广链接数量: ${nonCompliantLinks.length}`);

if (nonCompliantLinks.length > 0) {
  console.log('未合规链接清单:', nonCompliantLinks);
} else {
  console.log('✅ 联盟链接标记合规率: 100% (PASS)');
}

// 4.2 & 4.3 推广披露与佣金说明
console.log('\n--- 4.2 & 4.3 推广披露组件与文本合规性 ---');
let pagesWithDisclosure = 0;
let pagesWithAffiliateNotice = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('商业推广') || content.includes('透明声明') || content.includes('推广合作') || content.includes('返利')) {
    pagesWithDisclosure++;
  }
  if (content.includes('affiliate-notice-card') || content.includes('AffiliateNotice')) {
    pagesWithAffiliateNotice++;
  }
});

console.log(`展示推广披露提示的 HTML 页面数: ${pagesWithDisclosure} / ${htmlFiles.length}`);
console.log(`独立披露页面 (如 /disclosure): ${fs.existsSync('docs/disclosure.md') ? '已存在 (PASS)' : '缺失独立URL页面 (FAIL)'}`);
