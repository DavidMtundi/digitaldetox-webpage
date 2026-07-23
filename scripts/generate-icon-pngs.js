/**
 * Generate PNG versions of Pauseward icon at various sizes
 * Requires: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'icon-48x48.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'pauseward.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];

const inputPng = path.join(__dirname, '../../brand/source/pauseward-logo-icon.png');
const outputDir = path.join(__dirname, '../public');

async function generateIcons() {
  console.log('🎨 Generating Pauseward icon PNGs...\n');

  if (!fs.existsSync(inputPng)) {
    console.error('❌ PNG file not found:', inputPng);
    process.exit(1);
  }

  try {
    for (const { size, name } of sizes) {
      const outputPath = path.join(outputDir, name);

      await sharp(inputPng)
        .resize(size, size, { fit: 'contain', background: { r: 15, g: 20, b: 25, alpha: 1 } })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    const favicon32 = await sharp(inputPng)
      .resize(32, 32, { fit: 'contain', background: { r: 15, g: 20, b: 25, alpha: 1 } })
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(outputDir, 'favicon.ico'), favicon32);
    fs.copyFileSync(path.join(outputDir, 'pauseward.png'), path.join(outputDir, 'lucidfocus.png'));
    console.log('✅ Generated favicon.ico and lucidfocus.png alias');

    console.log('\n🎉 All icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();

