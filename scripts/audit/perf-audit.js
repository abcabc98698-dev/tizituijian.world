import fs from 'fs';
import path from 'path';

const distDir = path.resolve('docs/.vitepress/dist');
const assetsDir = path.join(distDir, 'assets');

let jsFiles = [];
let cssFiles = [];
let imgFiles = [];

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  for (const f of files) {
    const stat = fs.statSync(path.join(assetsDir, f));
    if (f.endsWith('.js')) jsFiles.push({ name: f, sizeKB: (stat.size / 1024).toFixed(2), bytes: stat.size });
    if (f.endsWith('.css')) cssFiles.push({ name: f, sizeKB: (stat.size / 1024).toFixed(2), bytes: stat.size });
    if (/\.(png|jpg|jpeg|webp|svg|gif|ico)$/i.test(f)) imgFiles.push({ name: f, sizeKB: (stat.size / 1024).toFixed(2), bytes: stat.size });
  }
}

jsFiles.sort((a,b) => b.bytes - a.bytes);
cssFiles.sort((a,b) => b.bytes - a.bytes);

console.log('=== 七、性能与移动体验审计 ===');
console.log('JS 资源数量:', jsFiles.length, '总大小:', (jsFiles.reduce((acc, x) => acc + x.bytes, 0) / 1024).toFixed(2), 'KB');
console.log('最大 JS 资源 Top 5:');
jsFiles.slice(0, 5).forEach(x => console.log(`  - ${x.name}: ${x.sizeKB} KB`));

console.log('CSS 资源数量:', cssFiles.length, '总大小:', (cssFiles.reduce((acc, x) => acc + x.bytes, 0) / 1024).toFixed(2), 'KB');
cssFiles.forEach(x => console.log(`  - ${x.name}: ${x.sizeKB} KB`));

const sampleHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const viewportMatch = sampleHtml.match(/<meta\s+name=["']viewport["'][^>]*>/i);
console.log('移动端 Viewport 适配:', viewportMatch ? viewportMatch[0] : 'MISSING');

const charsetMatch = sampleHtml.match(/<meta\s+charset=[^>]*>/i);
console.log('字符集声明:', charsetMatch ? charsetMatch[0] : 'MISSING');

// Check font loading or render-blocking styles
const linkStyles = sampleHtml.match(/<link\s+rel=["']stylesheet["'][^>]*>/gi) || [];
console.log('关键渲染路径 CSS 文件数量:', linkStyles.length);
linkStyles.forEach(x => console.log('  ', x));

// Scan all dist HTML files for img alt tags
function scanHtml(dir) {
  let list = [];
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      list = list.concat(scanHtml(full));
    } else if (f.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const allHtmls = scanHtml(distDir);
let missingAltCount = 0;
let totalImgCount = 0;
let missingAltExamples = [];

for (const htmlPath of allHtmls) {
  const content = fs.readFileSync(htmlPath, 'utf8');
  const imgTags = content.match(/<img\s+[^>]*>/gi) || [];
  totalImgCount += imgTags.length;
  for (const tag of imgTags) {
    if (!tag.includes('alt=') || /alt=["']\s*["']/.test(tag)) {
      missingAltCount++;
      if (missingAltExamples.length < 5) {
        missingAltExamples.push({ path: path.relative(distDir, htmlPath), tag });
      }
    }
  }
}

console.log(`全站 ${allHtmls.length} 个 HTML 中图片总数: ${totalImgCount}, 缺失或空 alt 属性数: ${missingAltCount}`);
if (missingAltExamples.length > 0) {
  console.log('缺失 alt 示例:', missingAltExamples);
}
