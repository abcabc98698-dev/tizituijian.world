import fs from 'fs';
import path from 'path';

function scanDir(dir) {
  let issues = 0;
  let totalLinks = 0;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      const res = scanDir(full);
      issues += res.issues;
      totalLinks += res.totalLinks;
    } else if (full.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf-8');
      const affMatches = html.matchAll(/href=["'](https?:\/\/[^"']*(?:aff|code=)[^"']*)["'][^>]*>/g);
      for (const m of affMatches) {
        totalLinks++;
        const tag = m[0];
        if (!tag.includes('nofollow') || !tag.includes('sponsored') || !tag.includes('noopener')) {
          console.warn(`[WARNING] Incompliant link in ${full}: ${tag}`);
          issues++;
        }
      }
    }
  }
  return { issues, totalLinks };
}

const result = scanDir('docs/.vitepress/dist');
console.log(`Scan finished: ${result.totalLinks} affiliate links checked, ${result.issues} issues found.`);
