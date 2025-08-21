const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(process.cwd(), 'data');

const defaultData = {
  'faculty.json': [],
  'gallery.json': [],
  'notices.json': [],
  'events.json': [],
  'achievements.json': [],
  'contact.json': { address: '', email: '', phone: '' }
};

async function initializeData() {
  try {
    // Create data directory if it doesn't exist
    await fs.mkdir(dataPath, { recursive: true });
    
    // Initialize each data file with default content if it doesn't exist
    for (const [filename, defaultContent] of Object.entries(defaultData)) {
      const filePath = path.join(dataPath, filename);
      try {
        await fs.access(filePath);
        console.log(`File ${filename} already exists, skipping...`);
      } catch (e) {
        await fs.writeFile(filePath, JSON.stringify(defaultContent, null, 2), 'utf8');
        console.log(`Created ${filename} with default content`);
      }
    }
    
    console.log('Data initialization complete!');
  } catch (error) {
    console.error('Error initializing data:', error);
    process.exit(1);
  }
}

initializeData();
