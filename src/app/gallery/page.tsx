import { getGallery } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default async function GalleryPage() {
  const images = await getGallery();

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Events & Gallery</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A glimpse into our department's vibrant life.
        </p>
      </header>

      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={image.caption}
                    data-ai-hint="college event"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <p className="text-white text-center text-sm">{image.caption}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
         <div className="text-center py-12">
          <p className="text-muted-foreground">The gallery is empty. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
