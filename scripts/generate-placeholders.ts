// Script to generate placeholder images for the about page
// Run with: npx tsx scripts/generate-placeholders.ts

import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Create images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Image configurations
const images = [
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&h=900&fit=crop&crop=center',
    filename: 'about-hero.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop&crop=center',
    filename: 'about-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&crop=faces',
    filename: 'team-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=faces',
    filename: 'team-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=faces',
    filename: 'team-3.jpg'
  }
];

async function downloadImage(url: string, filename: string) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(path.join(imagesDir, filename));
    response.data.pipe(writer);

    return new Promise<void>((resolve, reject) => {
      writer.on('finish', () => resolve());
      writer.on('error', (error) => reject(error));
    });
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error);
  }
}

async function main() {
  console.log('Downloading placeholder images...');
  
  for (const image of images) {
    console.log(`Downloading ${image.filename}...`);
    await downloadImage(image.url, image.filename);
  }
  
  console.log('All images downloaded successfully!');
}

main().catch(console.error);
