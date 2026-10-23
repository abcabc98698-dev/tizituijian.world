import fs from 'fs';

const html = fs.readFileSync('docs/.vitepress/dist/tizi-tuijian/xinshou-tizi.html', 'utf8');
const lines = html.split('\n');

console.log('=== Meta tags in xinshou-tizi.html ===');
const metaTags = html.match(/<meta[^>]*>/gi) || [];
metaTags.forEach(tag => {
  if (tag.includes('og:') || tag.includes('twitter:') || tag.includes('canonical') || tag.includes('article:')) {
    console.log(' ', tag);
  }
});

const linkTags = html.match(/<link[^>]*canonical[^>]*>/gi) || [];
console.log('Canonical links:');
linkTags.forEach(tag => console.log(' ', tag));
