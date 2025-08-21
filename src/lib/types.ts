export interface Faculty {
  id: string;
  name: string;
  designation: string;
  photo: string;
  qualification: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  studentName: string;
  year: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
}
