import fs from 'fs';
import path from 'path';

function scanAll(dir) {
  let list = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'assets') list = list.concat(scanAll(full));
    } else if (f.endsWith('.html') || f.endsWith('.txt') || f.endsWith('.htaccess')) {
      list.push(full);
    }
  }
  return list;
}

const files = scanAll('docs/.vitepress/dist');
let noindexCount = 0;
let disallowCount = 0;
let xRobotsNoindex = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (/name=["']robots["'][^>]*noindex/i.test(content)) {
    console.log('Found noindex in:', f);
    noindexCount++;
  }
  if (/Disallow:\s*\//i.test(content)) {
    console.log('Found Disallow: / in:', f);
    disallowCount++;
  }
  if (/X-Robots-Tag.*?noindex/i.test(content)) {
    console.log('Found X-Robots-Tag noindex in:', f);
    xRobotsNoindex++;
  }
}

console.log('=== 索引环境安全扫描 (残留排查) ===');
console.log('扫描文件数:', files.length);
console.log('意外 noindex 标签数:', noindexCount, '(PASS: 0)');
console.log('意外 Disallow: / 规则数:', disallowCount, '(PASS: 0)');
console.log('意外 X-Robots-Tag: noindex 数:', xRobotsNoindex, '(PASS: 0)');
