import fs from 'fs';
import path from 'path';

console.log('=== 五、内部链接与网站拓扑架构审计报告 ===\n');

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
const urlSet = new Set();
const linkGraph = new Map(); // url -> Set of target urls
const reverseGraph = new Map(); // target url -> Set of incoming urls

// Normalize URLs: e.g. 'index.html' -> '/', 'tizi-tuijian/index.html' -> '/tizi-tuijian/'
function fileToRoute(file) {
  let rel = path.relative('docs/.vitepress/dist', file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.replace(/\/index\.html$/, '/');
  if (rel.endsWith('.html')) return '/' + rel.replace(/\.html$/, '');
  return '/' + rel;
}

htmlFiles.forEach(f => {
  const route = fileToRoute(f);
  urlSet.add(route);
  linkGraph.set(route, new Set());
  if (!reverseGraph.has(route)) reverseGraph.set(route, new Set());
});

let emptyHrefs = 0;
let hashOnlyHrefs = 0;
let deadLinks = [];
let genericAnchors = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const sourceRoute = fileToRoute(file);

  const aMatches = content.matchAll(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi);
  for (const match of aMatches) {
    const href = match[1].trim();
    const anchorText = match[2].replace(/<[^>]+>/g, '').trim();

    if (href === '') {
      emptyHrefs++;
      continue;
    }
    if (href === '#') {
      hashOnlyHrefs++;
      continue;
    }

    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }

    // Internal link
    let cleanTarget = href.split('#')[0].split('?')[0];
    if (!cleanTarget) continue; // hash only within page

    // Normalize target
    let normTarget = cleanTarget;
    if (normTarget.startsWith('./')) normTarget = normTarget.substring(2);
    if (!normTarget.startsWith('/')) {
      normTarget = path.posix.join(path.posix.dirname(sourceRoute), normTarget);
    }
    if (normTarget !== '/' && !normTarget.endsWith('/') && !normTarget.endsWith('.html')) {
      // Check if folder or page
      if (urlSet.has(normTarget + '/')) {
        normTarget = normTarget + '/';
      }
    }

    if (urlSet.has(normTarget)) {
      linkGraph.get(sourceRoute)?.add(normTarget);
      if (!reverseGraph.has(normTarget)) reverseGraph.set(normTarget, new Set());
      reverseGraph.get(normTarget).add(sourceRoute);
    } else {
      deadLinks.push({ source: sourceRoute, href, normTarget });
    }

    // Anchor text audit
    if (['点击这里', '阅读更多', '查看更多', '详情', '链接', 'click here'].includes(anchorText)) {
      genericAnchors.push({ source: sourceRoute, text: anchorText, href });
    }
  }
});

console.log(`[5.1 死链与空链接] href="" 空链接: ${emptyHrefs}`);
console.log(`[5.1 死链与空链接] href="#" 纯哈希链接: ${hashOnlyHrefs}`);
console.log(`[5.1 死链与空链接] 内部死链数: ${deadLinks.length}`);
if (deadLinks.length > 0) {
  console.log('内部死链前 5 条:', deadLinks.slice(0, 5));
}

// 5.2 BFS 计算所有页面的点击深度 (Crawl Depth)
console.log('\n--- 5.2 点击深度 (Crawl Depth from /) ---');
const depthMap = new Map();
const queue = [{ route: '/', depth: 0 }];
depthMap.set('/', 0);

while (queue.length > 0) {
  const { route, depth } = queue.shift();
  const outgoing = linkGraph.get(route) || new Set();
  for (const next of outgoing) {
    if (!depthMap.has(next)) {
      depthMap.set(next, depth + 1);
      queue.push({ route: next, depth: depth + 1 });
    }
  }
}

const depthBuckets = {};
const deepPages = [];
let unreachableFromHome = [];

for (const url of urlSet) {
  if (url === '/404') continue;
  if (!depthMap.has(url)) {
    unreachableFromHome.push(url);
  } else {
    const d = depthMap.get(url);
    depthBuckets[d] = (depthBuckets[d] || 0) + 1;
    if (d > 3) {
      deepPages.push({ url, depth: d });
    }
  }
}

console.log('点击深度分布:', depthBuckets);
console.log(`点击深度超过 3 层的页面数: ${deepPages.length}`);
if (deepPages.length > 0) {
  console.log('深度 > 3 页面清单:', deepPages);
}
console.log(`从首页不可达页面数 (Unreachable from home): ${unreachableFromHome.length}`);
if (unreachableFromHome.length > 0) {
  console.log('从首页不可达页面:', unreachableFromHome);
}

// 5.3 孤立页面 (Orphan Pages)
console.log('\n--- 5.3 孤立页面 (Orphan Pages - 0 Inbound Links) ---');
const orphanPages = [];
for (const url of urlSet) {
  if (url === '/' || url === '/404') continue;
  const inbounds = reverseGraph.get(url) || new Set();
  if (inbounds.size === 0) {
    orphanPages.push(url);
  }
}
console.log(`孤立页面总数 (入链为0): ${orphanPages.length}`);
if (orphanPages.length > 0) {
  console.log('孤立页面清单:', orphanPages);
}

// 5.4 锚文本质量
console.log('\n--- 5.4 锚文本质量统计 ---');
console.log(`无意义泛词锚文本数量 ("点击这里"/"阅读更多"等): ${genericAnchors.length}`);
if (genericAnchors.length > 0) {
  console.log('泛词锚文本样例:', genericAnchors.slice(0, 5));
}
