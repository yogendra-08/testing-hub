'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { addGalleryImageAction, deleteGalleryImageAction } from '@/app/actions';
import type { GalleryImage } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Trash2, Upload } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full gap-2">
      {pending ? "Uploading..." : <><Upload className="h-4 w-4" /> Upload Image</>}
    </Button>
  );
}

export function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [state, formAction] = useActionState(addGalleryImageAction, { success: false, message: '' });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({ title: "Success", description: state.message });
      formRef.current?.reset();
    } else if (state.message) {
      toast({ variant: "destructive", title: "Error", description: state.message });
    }
  }, [state, toast]);

  const handleDelete = async (id: string) => {
    const result = await deleteGalleryImageAction(id);
    if (result.success) {
      toast({ title: "Success", description: result.message });
    } else {
      toast({ variant: "destructive", title: "Error", description: result.message });
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8 items-start">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Upload New Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image File</Label>
              <Input id="image" name="image" type="file" accept="image/*" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption (Optional)</Label>
              <Input id="caption" name="caption" type="text" placeholder="E.g., Annual Tech Fest 2024" />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold font-headline mb-4">Existing Images</h2>
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map(image => (
              <div key={image.id} className="relative group">
                <Image src={image.url} alt={image.caption} data-ai-hint="event photo" width={200} height={200} className="rounded-md object-cover aspect-square" />
                <div className="absolute top-1 right-1">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will permanently delete the image from the gallery.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(image.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <p className='text-xs truncate text-center bg-black/50 text-white absolute bottom-0 w-full p-1 rounded-b-md'>{image.caption}</p>
              </div>
            ))}
          </div>
        ) : <p className='text-muted-foreground'>No images in gallery.</p>}
      </div>
    </div>
  );
}
