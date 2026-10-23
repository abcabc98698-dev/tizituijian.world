import fs from 'fs';
import path from 'path';

console.log('=== 六、结构化数据 (JSON-LD / Schema.org) 审计报告 ===\n');

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
let totalSchemasFound = 0;
let validSchemas = 0;
let jsonLdParseErrors = [];
let schemaTypes = {};
let pagesWithSchema = 0;
let pagesWithoutSchema = 0;
let pagesWithSchemaList = [];
let pagesWithoutSchemaList = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative('docs/.vitepress/dist', file).replace(/\\/g, '/');

  const matches = [...content.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

  if (matches.length > 0) {
    pagesWithSchema++;
    pagesWithSchemaList.push(rel);

    matches.forEach(m => {
      totalSchemasFound++;
      try {
        const parsed = JSON.parse(m[1].trim());
        validSchemas++;
        const type = parsed['@type'] || (Array.isArray(parsed['@graph']) ? parsed['@graph'].map(g => g['@type']).join('+') : 'Unknown');
        schemaTypes[type] = (schemaTypes[type] || 0) + 1;
      } catch (err) {
        jsonLdParseErrors.push({ file: rel, error: err.message, raw: m[1] });
      }
    });
  } else {
    pagesWithoutSchema++;
    pagesWithoutSchemaList.push(rel);
  }
});

console.log(`全站 HTML 文件数: ${htmlFiles.length}`);
console.log(`包含 Schema (JSON-LD) 的页面数: ${pagesWithSchema}`);
console.log(`缺失 Schema (JSON-LD) 的页面数: ${pagesWithoutSchema}`);
console.log(`解析出的 Schema 节点总数: ${totalSchemasFound}`);
console.log(`有效合法 JSON-LD: ${validSchemas}`);
console.log(`JSON-LD 解析语法错误: ${jsonLdParseErrors.length}`);
if (jsonLdParseErrors.length > 0) {
  console.log('语法错误详情:', jsonLdParseErrors);
}
console.log('Schema 类型统计分布:', schemaTypes);
console.log('\n示例含有 Schema 的页面:', pagesWithSchemaList.slice(0, 5));
console.log('示例缺失 Schema 的页面:', pagesWithoutSchemaList.slice(0, 5));
