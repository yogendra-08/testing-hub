import { getGallery } from "@/lib/data";
import { GalleryClient } from "./GalleryClient";

export default async function GalleryAdminPage() {
  const gallery = await getGallery();
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">Manage Gallery</h1>
        <p className="text-muted-foreground">Upload or remove images from the website gallery.</p>
      </header>
      <GalleryClient images={gallery} />
    </div>
  );
}
