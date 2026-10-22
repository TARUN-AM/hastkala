import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const targetDir = path.join(process.cwd(), 'public', 'images', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Exact column coordinates (586px wide each) and Y frame (410 to 1150 => 740px height)
const colWidth = 586;
const imgHeight = 740;
const startY = 410;

const columns = [208, 834, 1461, 2087];

// Screenshot 1: Pushpa Lamp, Honey Stick Set, Pen Kalamkari Pink, Matsya Noir Lamp
const s1Products = [
  'pushpa_lamp.png',
  'honey_stick_set.png',
  'kalamkari_pink.png',
  'matsya_noir_lamp.png'
];

s1Products.forEach((filename, idx) => {
  const x = columns[idx];
  const outPath = path.join(targetDir, filename);
  const cmd = `convert public/assets/aistudio/Screenshot_2026-10-22_204234_e8a51168.png -crop ${colWidth}x${imgHeight}+${x}+${startY} ${outPath}`;
  console.log(`Cropping S1 [${idx + 1}/4] -> ${filename}`);
  execSync(cmd);
});

// Screenshot 2: Haathi, Tshirt, Boat Platter, Pen Kalamkari Cream
const s2Products = [
  'haathi.png',
  'tshirt.png',
  'boat_platter.png',
  'kalamkari_cream.png'
];

s2Products.forEach((filename, idx) => {
  const x = columns[idx];
  const outPath = path.join(targetDir, filename);
  const cmd = `convert public/assets/aistudio/Screenshot_2026-10-22_204224_ae59848c.png -crop ${colWidth}x${imgHeight}+${x}+${startY} ${outPath}`;
  console.log(`Cropping S2 [${idx + 1}/4] -> ${filename}`);
  execSync(cmd);
});

console.log('Successfully cropped all 8 product images!');
