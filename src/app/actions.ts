'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getFaculty,
  saveFaculty,
  getGallery,
  saveGallery,
  getNotices,
  saveNotices,
  getEvents,
  saveEvents,
  getAchievements,
  saveAchievements,
  getContactInfo,
  saveContactInfo,
} from '@/lib/data';
import type { Faculty, GalleryImage, Notice, Event, Achievement } from '@/lib/types';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

const SESSION_COOKIE_NAME = 'gpn-it-hub-session';

// --- AUTH ACTIONS ---

export async function login(prevState: { message: string }, formData: FormData) {
  const adminId = formData.get('id');
  const password = formData.get('password');

  if (adminId === 'ITHOD@GPN' && password === 'ITHOD123') {
    const sessionData = { isAdmin: true, user: 'ITHOD' };
    cookies().set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    redirect('/admin/dashboard');
  }

  return { message: 'Invalid credentials.' };
}

export async function logout() {
  cookies().delete(SESSION_COOKIE_NAME);
  redirect('/admin');
}

// --- FILE UPLOAD HELPER ---

async function handleFileUpload(file: File, uploadDir: string): Promise<string> {
    if (file.size === 0) {
        throw new Error('File is empty');
    }
    const publicDir = path.join(process.cwd(), 'public', uploadDir);
    await fs.mkdir(publicDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(publicDir, filename);
    await fs.writeFile(filepath, buffer);
    
    return path.join('/', uploadDir, filename);
}


// --- FACULTY ACTIONS ---

const facultySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  designation: z.string().min(1, 'Designation is required'),
  qualification: z.string().min(1, 'Qualification is required'),
});

export async function saveFacultyAction(prevState: any, formData: FormData) {
  try {
    const validatedFields = facultySchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
      return { success: false, message: 'Invalid data', errors: validatedFields.error.flatten().fieldErrors };
    }

    const { id, ...data } = validatedFields.data;
    const facultyList = await getFaculty();
    let photoUrl = formData.get('currentPhotoUrl') as string || '';

    const photoFile = formData.get('photo') as File;
    if (photoFile && photoFile.size > 0) {
        photoUrl = await handleFileUpload(photoFile, 'uploads/faculty');
    }

    if (id) {
      // Update
      const updatedList = facultyList.map(f => f.id === id ? { ...f, ...data, photo: photoUrl } : f);
      await saveFaculty(updatedList);
    } else {
      // Add
      const newFaculty: Faculty = { id: Date.now().toString(), ...data, photo: photoUrl };
      await saveFaculty([...facultyList, newFaculty]);
    }

    revalidatePath('/faculty');
    revalidatePath('/admin/dashboard/faculty');
    return { success: true, message: 'Faculty saved successfully.' };
  } catch (e) {
    return { success: false, message: (e as Error).message };
  }
}

export async function deleteFacultyAction(id: string) {
  try {
    const facultyList = await getFaculty();
    const updatedList = facultyList.filter(f => f.id !== id);
    await saveFaculty(updatedList);

    revalidatePath('/faculty');
    revalidatePath('/admin/dashboard/faculty');
    return { success: true, message: 'Faculty deleted successfully.' };
  } catch(e) {
     return { success: false, message: (e as Error).message };
  }
}

// --- GALLERY ACTIONS ---

export async function addGalleryImageAction(prevState: any, formData: FormData) {
  try {
    const imageFile = formData.get('image') as File;
    const caption = formData.get('caption') as string || '';
    
    if (!imageFile || imageFile.size === 0) {
        return { success: false, message: "Image file is required." };
    }

    const imageUrl = await handleFileUpload(imageFile, 'uploads/gallery');
    
    const gallery = await getGallery();
    const newImage: GalleryImage = {
        id: Date.now().toString(),
        url: imageUrl,
        caption: caption
    };
    await saveGallery([...gallery, newImage]);

    revalidatePath('/gallery');
    revalidatePath('/admin/dashboard/gallery');
    return { success: true, message: 'Image added successfully.' };
  } catch(e) {
     return { success: false, message: (e as Error).message };
  }
}

export async function deleteGalleryImageAction(id: string) {
    try {
        const gallery = await getGallery();
        const updatedGallery = gallery.filter(img => img.id !== id);
        await saveGallery(updatedGallery);
        
        revalidatePath('/gallery');
        revalidatePath('/admin/dashboard/gallery');
        return { success: true, message: 'Image deleted successfully.' };
    } catch(e) {
        return { success: false, message: (e as Error).message };
    }
}


// --- OTHER CRUD ACTIONS (Simplified for brevity) ---

export async function saveNoticeAction(data: Omit<Notice, 'id'>, id?: string) {
  const notices = await getNotices();
  if (id) {
    await saveNotices(notices.map(n => n.id === id ? { ...n, ...data } : n));
  } else {
    await saveNotices([...notices, { id: Date.now().toString(), ...data }]);
  }
  revalidatePath('/students');
  revalidatePath('/admin/dashboard/notices');
}

export async function deleteNoticeAction(id: string) {
  const notices = await getNotices();
  await saveNotices(notices.filter(n => n.id !== id));
  revalidatePath('/students');
  revalidatePath('/admin/dashboard/notices');
}

export async function saveEventAction(data: Omit<Event, 'id'>, id?: string) {
    const events = await getEvents();
    if(id) {
        await saveEvents(events.map(e => e.id === id ? { ...e, ...data } : e));
    } else {
        await saveEvents([...events, { id: Date.now().toString(), ...data }]);
    }
    revalidatePath('/admin/dashboard/events');
}

export async function deleteEventAction(id: string) {
    const events = await getEvents();
    await saveEvents(events.filter(e => e.id !== id));
    revalidatePath('/admin/dashboard/events');
}

export async function saveAchievementAction(data: Omit<Achievement, 'id'>, id?: string) {
    const achievements = await getAchievements();
    if(id) {
        await saveAchievements(achievements.map(a => a.id === id ? { ...a, ...data } : a));
    } else {
        await saveAchievements([...achievements, { id: Date.now().toString(), ...data }]);
    }
    revalidatePath('/students');
    revalidatePath('/admin/dashboard/events');
}

export async function deleteAchievementAction(id: string) {
    const achievements = await getAchievements();
    await saveAchievements(achievements.filter(a => a.id !== id));
    revalidatePath('/students');
    revalidatePath('/admin/dashboard/events');
}


export async function saveContactInfoAction(prevState: any, formData: FormData) {
  try {
    const data = {
      address: formData.get('address') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };
    await saveContactInfo(data);
    revalidatePath('/contact');
    revalidatePath('/admin/dashboard/contact');
    return { success: true, message: 'Contact info updated successfully.' };
  } catch (e) {
    return { success: false, message: (e as Error).message };
  }
}
