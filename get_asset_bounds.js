const { svgPathBbox } = require('svg-path-bbox');
const fs = require('fs');

const mappings = [
  { char: 'G', file: 'assets/SVG/Asset 7.svg' },
  { char: 'O', file: 'assets/SVG/Asset 6.svg' },
  { char: 'R', file: 'assets/SVG/Asset 5.svg' },
  { char: 'D', file: 'assets/SVG/Asset 4.svg' },
  { char: 'L', file: 'assets/SVG/Asset 3.svg' },
  { char: 'E', file: 'assets/SVG/Asset 2.svg' },
  { char: 'Y', file: 'assets/SVG/Asset 1.svg' },
];

for (const m of mappings) {
  const content = fs.readFileSync(m.file, 'utf8');
  const match = content.match(/d="([^"]+)"/);
  if (match) {
    const d = match[1];
    const [minX, minY, maxX, maxY] = svgPathBbox(d);
    console.log(`'${m.char}': { d: "${d}", x: ${minX}, y: ${minY}, w: ${maxX - minX}, h: ${maxY - minY} },`);
  }
}
