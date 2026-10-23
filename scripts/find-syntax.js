import fs from 'fs';

const content = fs.readFileSync('scripts/build-golden-pillars.js', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // check for unescaped backtick
  // In JS regex: /(?<!\\)`/
  const unescaped = [];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === '`') {
      if (j === 0 || line[j - 1] !== '\\') {
        unescaped.push(j);
      }
    }
  }
  if (unescaped.length > 0) {
    const trimmed = line.trim();
    if (trimmed.startsWith('content: `') || trimmed.endsWith('`,') || trimmed.endsWith('`') || trimmed === '`;') {
      // expected template boundaries
    } else {
      console.log(`Line ${i + 1}: ${line}`);
    }
  }
}
