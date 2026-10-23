import fs from 'fs';
import path from 'path';

function getAllMdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (file !== '.vitepress' && file !== 'public') results = results.concat(getAllMdFiles(full));
    } else if (file.endsWith('.md')) {
      results.push(full);
    }
  });
  return results;
}

const mdFiles = getAllMdFiles('docs');
console.log('=== 二、内容质量健康检查报告 ===\n');
console.log(`扫描 Markdown 内容页面总数: ${mdFiles.length}`);

// 2.1 内容深度
const wordCounts = [];
let thinContentCount = 0; // < 500 chars
let highRiskThinCount = 0; // < 300 chars
const thinList = [];

mdFiles.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const rel = path.relative('docs', f).replace(/\\/g, '/');
  // strip frontmatter
  const body = c.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim();
  const len = body.length;
  wordCounts.push({ file: rel, len });

  if (len < 500) {
    thinContentCount++;
    thinList.push({ file: rel, len });
    if (len < 300) {
      highRiskThinCount++;
    }
  }
});

wordCounts.sort((a, b) => b.len - a.len);
const totalChars = wordCounts.reduce((acc, cur) => acc + cur.len, 0);
const avgChars = Math.round(totalChars / wordCounts.length);
const maxPage = wordCounts[0];
const minPage = wordCounts[wordCounts.length - 1];

console.log(`[2.1 内容深度] 全站文字总字数/字符数: ${totalChars} 字符`);
console.log(`[2.1 内容深度] 页面平均字符数: ${avgChars} 字符 / 页`);
console.log(`[2.1 内容深度] 最大单页: ${maxPage.file} (${maxPage.len} 字符)`);
console.log(`[2.1 内容深度] 最小单页: ${minPage.file} (${minPage.len} 字符)`);
console.log(`[2.1 内容深度] < 500 字符页面数 (Thin Content): ${thinContentCount}`);
console.log(`[2.1 内容深度] < 300 字符页面数 (High Risk): ${highRiskThinCount}`);
if (thinList.length > 0) {
  console.log('Thin content 清单:', thinList);
}

// 2.3 内容重复度 (Title, Description, H1)
console.log('\n--- 2.3 内容重复度检查 ---');
const titles = new Map();
const descriptions = new Map();
const h1s = new Map();

let dupTitles = [];
let dupDescriptions = [];
let dupH1s = [];

mdFiles.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const rel = path.relative('docs', f).replace(/\\/g, '/');
  
  const fmM = c.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fmM) {
    const titleM = fmM[1].match(/title:\s*(.+)/);
    const descM = fmM[1].match(/description:\s*(.+)/);
    
    if (titleM) {
      const t = titleM[1].trim();
      if (titles.has(t)) {
        dupTitles.push({ title: t, file1: titles.get(t), file2: rel });
      } else {
        titles.set(t, rel);
      }
    }
    
    if (descM) {
      const d = descM[1].trim();
      if (descriptions.has(d)) {
        dupDescriptions.push({ desc: d, file1: descriptions.get(d), file2: rel });
      } else {
        descriptions.set(d, rel);
      }
    }
  }

  const h1M = c.match(/^#\s+(.+)$/m);
  if (h1M) {
    const h1 = h1M[1].trim();
    if (h1s.has(h1)) {
      dupH1s.push({ h1, file1: h1s.get(h1), file2: rel });
    } else {
      h1s.set(h1, rel);
    }
  }
});

console.log(`重复 Title 数量: ${dupTitles.length}`);
if (dupTitles.length > 0) console.log('重复 Title 详情:', dupTitles);

console.log(`重复 Description 数量: ${dupDescriptions.length}`);
if (dupDescriptions.length > 0) console.log('重复 Description 详情:', dupDescriptions);

console.log(`重复 H1 数量: ${dupH1s.length}`);
if (dupH1s.length > 0) console.log('重复 H1 详情:', dupH1s);

// 2.4 内容更新频率
console.log('\n--- 2.4 内容更新频率检查 ---');
let hasLastUpdatedInConfig = false;
const configContent = fs.readFileSync('docs/.vitepress/config.mts', 'utf8');
if (configContent.includes('lastUpdated: true') || configContent.includes('lastUpdated:')) {
  hasLastUpdatedInConfig = true;
}
console.log(`VitePress 是否开启 global lastUpdated: ${hasLastUpdatedInConfig}`);

// 2.5 检查是否存在 content-map.md
console.log('\n--- 2.5 内容覆盖度检查 ---');
const contentMapExists = fs.existsSync('content-map.md') || fs.existsSync('docs/content-map.md');
console.log(`content-map.md 是否存在: ${contentMapExists}`);
