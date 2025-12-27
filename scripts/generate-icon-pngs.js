/**
 * Generate PNG versions of LucidFocus icon at various sizes
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
  { size: 512, name: 'lucidfocus.png' }, // Main icon
  { size: 180, name: 'apple-touch-icon.png' }, // Apple touch icon
];

const inputSvg = path.join(__dirname, '../public/lucidfocus-icon-simple.svg');
const outputDir = path.join(__dirname, '../public');

async function generateIcons() {
  console.log('🎨 Generating LucidFocus icon PNGs...\n');

  // Check if SVG exists
  if (!fs.existsSync(inputSvg)) {
    console.error('❌ SVG file not found:', inputSvg);
    process.exit(1);
  }

  try {
    for (const { size, name } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(inputSvg)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    // Also create favicon.ico (16x16 and 32x32 combined)
    const favicon16 = await sharp(inputSvg)
      .resize(16, 16, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toBuffer();

    const favicon32 = await sharp(inputSvg)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toBuffer();

    // For favicon.ico, we'll just copy the 32x32 as a simple solution
    // (Creating proper .ico requires additional libraries)
    fs.writeFileSync(
      path.join(outputDir, 'favicon.ico'),
      favicon32
    );
    console.log('✅ Generated favicon.ico (32x32)');

    console.log('\n🎉 All icons generated successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Update layout.tsx to use new icon paths');
    console.log('2. Update header.tsx and footer.tsx logo references');
    console.log('3. Test icons at different sizes');
    
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();

