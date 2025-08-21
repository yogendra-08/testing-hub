import fs from 'fs/promises';
import path from 'path';
import type { Faculty, GalleryImage, Notice, Event, Achievement, ContactInfo } from './types';

const dataPath = path.join(process.cwd(), 'data');

async function readFile<T>(filename: string): Promise<T> {
  const filePath = path.join(dataPath, filename);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    if (!data.trim()) {
      // Handle empty files
      throw new Error('File is empty');
    }
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT' || 
        (error as Error).message === 'File is empty' || 
        error instanceof SyntaxError) {
      // Return appropriate defaults based on filename
      if (filename.endsWith('.json') && (filename.includes('faculty') || 
          filename.includes('gallery') || 
          filename.includes('notices') || 
          filename.includes('events') || 
          filename.includes('achievements'))) {
        return [] as T;
      }
      if (filename === 'contact.json') {
        return { address: '', email: '', phone: '' } as T;
      }
    }
    console.error(`Error reading file ${filename}:`, error);
    throw error;
  }
}

async function writeFile(filename: string, data: any): Promise<void> {
  const filePath = path.join(dataPath, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Faculty
export const getFaculty = () => readFile<Faculty[]>('faculty.json');
export const saveFaculty = (data: Faculty[]) => writeFile('faculty.json', data);

// Gallery
export const getGallery = () => readFile<GalleryImage[]>('gallery.json');
export const saveGallery = (data: GalleryImage[]) => writeFile('gallery.json', data);

// Notices
export const getNotices = () => readFile<Notice[]>('notices.json');
export const saveNotices = (data: Notice[]) => writeFile('notices.json', data);

// Events
export const getEvents = () => readFile<Event[]>('events.json');
export const saveEvents = (data: Event[]) => writeFile('events.json', data);

// Achievements
export const getAchievements = () => readFile<Achievement[]>('achievements.json');
export const saveAchievements = (data: Achievement[]) => writeFile('achievements.json', data);

// Contact Info
export const getContactInfo = () => readFile<ContactInfo>('contact.json');
export const saveContactInfo = (data: ContactInfo) => writeFile('contact.json', data);
