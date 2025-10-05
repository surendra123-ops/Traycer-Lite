// Simple script to create placeholder icons
const fs = require('fs');
const path = require('path');

// Create icons directory
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create simple placeholder files (Chrome will use default icons if these don't exist)
const placeholderContent = 'Placeholder icon file';

fs.writeFileSync(path.join(iconsDir, 'icon16.png'), placeholderContent);
fs.writeFileSync(path.join(iconsDir, 'icon48.png'), placeholderContent);
fs.writeFileSync(path.join(iconsDir, 'icon128.png'), placeholderContent);

console.log('Icon placeholders created in public/icons/');
