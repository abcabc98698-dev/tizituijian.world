import fs from 'fs';
import path from 'path';

// URL 防批量AI识别优化系统与原创性重复度综合检查器

const BANNED_AI_SLOP = [
  '在当今数字化时代',
  '在数字化浪潮中',
  '在当今数字化的时代',
  '数字化浪潮下',
  '总而言之',
  '综上所述',
  '宛如一把双刃剑',
  '值得一提的是',
  '不言而喻',
  '本篇专题深度聚焦于',
  '在进行网络代理与梯子选型时，用户往往面临纷繁复杂的技术概念',
];

function getAllMdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== '.vitepress' && file !== 'public') {
        results = results.concat(getAllMdFiles(fullPath));
      }
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getAllMdFiles('docs');
console.log(`\n======================================================`);
console.log(`🔍 启动 URL 防批量 AI 识别优化系统检查 (共 ${files.length} 个页面)`);
console.log(`======================================================\n`);

let totalIssues = 0;
const titles = new Map();
const descriptions = new Map();
const fileContents = new Map();

// 1. Frontmatter, Title, Description, Word Count & Slop Check
console.log(`[Phase 1] 元数据唯一性、字数深度与 AI 批量特征扫描...`);
let slopMatches = 0;

files.forEach(file => {
  const relPath = path.relative('docs', file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  fileContents.set(relPath, content);

  // Extract frontmatter
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    console.warn(`⚠️ [缺少 Frontmatter]: ${relPath}`);
    totalIssues++;
    return;
  }
  const fmText = fmMatch[1];
  const titleMatch = fmText.match(/title:\s*(.+)/);
  const descMatch = fmText.match(/description:\s*(.+)/);

  if (!titleMatch) {
    console.warn(`⚠️ [缺少 Title]: ${relPath}`);
    totalIssues++;
  } else {
    const title = titleMatch[1].trim();
    if (titles.has(title)) {
      console.warn(`🚨 [Title 重复]: "${title}" 在 ${relPath} 与 ${titles.get(title)} 冲突!`);
      totalIssues++;
    } else {
      titles.set(title, relPath);
    }
  }

  if (!descMatch) {
    console.warn(`⚠️ [缺少 Description]: ${relPath}`);
    totalIssues++;
  } else {
    const desc = descMatch[1].trim();
    if (descriptions.has(desc)) {
      console.warn(`🚨 [Description 重复]: 在 ${relPath} 与 ${descriptions.get(desc)} 冲突!`);
      totalIssues++;
    } else {
      descriptions.set(desc, relPath);
    }
  }

  // Check Slop
  BANNED_AI_SLOP.forEach(slop => {
    if (content.includes(slop)) {
      console.warn(`❌ [检出 AI 模板套话]: "${slop}" 在 ${relPath}`);
      slopMatches++;
      totalIssues++;
    }
  });
});

console.log(`Phase 1 完成: 共扫描 ${titles.size} 个独立 Title, 检出 AI 模板套话 ${slopMatches} 处。\n`);

// 2. N-Gram / Jaccard Similarity Check between Subtopic Articles
console.log(`[Phase 2] 文章内容相似度防批量检测 (Jaccard 3-gram 算法)...`);

function getShingles(text, k = 4) {
  // strip code blocks, HTML tags, frontmatter, markdown symbols
  const clean = text
    .replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
    .replace(/<[^>]+>/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');

  const shingles = new Set();
  for (let i = 0; i <= clean.length - k; i++) {
    shingles.add(clean.substring(i, i + k));
  }
  return shingles;
}

// Compare only subtopic articles within same categories
const categoryArticles = {};
for (const [relPath, content] of fileContents.entries()) {
  const parts = relPath.split('/');
  if (parts.length === 2 && parts[1] !== 'index.md' && parts[0] !== 'brands') {
    const cat = parts[0];
    categoryArticles[cat] = categoryArticles[cat] || [];
    categoryArticles[cat].push({ path: relPath, shingles: getShingles(content) });
  }
}

let highSimilarityCount = 0;
for (const [cat, arts] of Object.entries(categoryArticles)) {
  for (let i = 0; i < arts.length; i++) {
    for (let j = i + 1; j < arts.length; j++) {
      const a = arts[i];
      const b = arts[j];
      let intersection = 0;
      for (const sh of a.shingles) {
        if (b.shingles.has(sh)) intersection++;
      }
      const union = a.shingles.size + b.shingles.size - intersection;
      const sim = union > 0 ? (intersection / union) : 0;
      if (sim > 0.35) { // 35% threshold
        console.warn(`🚨 [高内容重合度报警]: ${a.path} 与 ${b.path} 相似度高达 ${(sim * 100).toFixed(1)}%!`);
        highSimilarityCount++;
        totalIssues++;
      }
    }
  }
}
console.log(`Phase 2 完成: 同栏目文章交叉比对，高相似度 (>35%) 异常数: ${highSimilarityCount} 篇。\n`);

// 3. Internal Link Integrity Audit
console.log(`[Phase 3] 全站蜂巢内链有效性检查...`);
let brokenLinks = 0;

for (const [relPath, content] of fileContents.entries()) {
  const linkMatches = content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
  for (const match of linkMatches) {
    const href = match[2];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#') || href.startsWith('mailto:')) {
      continue;
    }
    // internal link
    let target = href.split('#')[0];
    if (!target) continue; // hash only

    // resolve clean url
    let expectedFile = '';
    if (target.endsWith('/')) {
      expectedFile = path.join('docs', target, 'index.md');
    } else if (target.startsWith('/')) {
      // could be /folder or /folder/page
      const norm = target.substring(1);
      if (fs.existsSync(path.join('docs', norm + '.md'))) {
        expectedFile = path.join('docs', norm + '.md');
      } else if (fs.existsSync(path.join('docs', norm, 'index.md'))) {
        expectedFile = path.join('docs', norm, 'index.md');
      } else {
        expectedFile = path.join('docs', norm + '.md');
      }
    } else {
      // relative
      expectedFile = path.resolve(path.dirname(path.join('docs', relPath)), target + (target.endsWith('.md') ? '' : '.md'));
    }

    if (!fs.existsSync(expectedFile)) {
      console.warn(`🔗 [死链 Dead Link]: 在 ${relPath} 中发现指向无效路径: "${href}" (解析为: ${expectedFile})`);
      brokenLinks++;
      totalIssues++;
    }
  }
}
console.log(`Phase 3 完成: 检出内部死链: ${brokenLinks} 处。\n`);

// 4. External Affiliate Compliance Audit
console.log(`[Phase 4] 商业化直达与外链合规性扫描...`);
let nonCompliantAff = 0;
let totalAffLinks = 0;

for (const [relPath, content] of fileContents.entries()) {
  // check raw html <a> links and context hooks
  const aMatches = content.matchAll(/<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi);
  for (const match of aMatches) {
    const tag = match[0];
    const url = match[1];
    if (url.includes('aff') || url.includes('code=') || url.includes('register')) {
      totalAffLinks++;
      if (!tag.includes('rel="nofollow') || !tag.includes('sponsored') || !tag.includes('noopener')) {
        console.warn(`⚠️ [外链缺少合规属性]: 在 ${relPath} 中: ${tag}`);
        nonCompliantAff++;
        totalIssues++;
      }
    }
  }
}
console.log(`Phase 4 完成: 扫描到 ${totalAffLinks} 处转化外链，不合规数: ${nonCompliantAff} 处。\n`);

// Summary
console.log(`======================================================`);
console.log(`📊 检查结果综合汇总:`);
console.log(`- 页面总数: ${files.length}`);
console.log(`- AI 模板套话: ${slopMatches}`);
console.log(`- 高重合度文章: ${highSimilarityCount}`);
console.log(`- 内部死链数: ${brokenLinks}`);
console.log(`- 外链不合规数: ${nonCompliantAff}`);
console.log(`- 状态: ${totalIssues === 0 ? '✅ 完美通过所有 URL 防批量 AI 识别与 SEO 检查!' : '⚠️ 存在 ' + totalIssues + ' 处待优化项'}`);
console.log(`======================================================\n`);
