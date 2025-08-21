"use client";

import type { Event, Achievement } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { deleteEventAction, saveEventAction, deleteAchievementAction, saveAchievementAction } from "@/app/actions";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Event Form
function EventForm({ item, onFinished }: { item: Event | null, onFinished: () => void }) {
  const { toast } = useToast();
  
  async function handleSubmit(formData: FormData) {
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: new Date(formData.get('date') as string).toISOString(),
    };
    await saveEventAction(data, item?.id);
    toast({ title: "Success", description: "Event saved." });
    onFinished();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <Input id="title" name="title" defaultValue={item?.title} placeholder="Event Title" required />
      <Textarea id="description" name="description" defaultValue={item?.description} placeholder="Event Description" required />
      <Input id="date" name="date" type="date" defaultValue={item?.date.substring(0, 10)} required />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onFinished}>Cancel</Button>
        <Button type="submit">Save Event</Button>
      </div>
    </form>
  )
}

// Achievement Form
function AchievementForm({ item, onFinished }: { item: Achievement | null, onFinished: () => void }) {
  const { toast } = useToast();
  
  async function handleSubmit(formData: FormData) {
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      studentName: formData.get('studentName') as string,
      year: formData.get('year') as string,
    };
    await saveAchievementAction(data, item?.id);
    toast({ title: "Success", description: "Achievement saved." });
    onFinished();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <Input id="title" name="title" defaultValue={item?.title} placeholder="Achievement Title" required />
      <Input id="studentName" name="studentName" defaultValue={item?.studentName} placeholder="Student Name" required />
      <Input id="year" name="year" defaultValue={item?.year} placeholder="Year (e.g., 2024)" required />
      <Textarea id="description" name="description" defaultValue={item?.description} placeholder="Description" required />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onFinished}>Cancel</Button>
        <Button type="submit">Save Achievement</Button>
      </div>
    </form>
  )
}

export function EventsClient({ initialEvents, initialAchievements }: { initialEvents: Event[], initialAchievements: Achievement[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<'event' | 'achievement' | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const { toast } = useToast();

  const handleAddNew = (type: 'event' | 'achievement') => {
    setDialogContent(type);
    setSelectedEvent(null);
    setSelectedAchievement(null);
    setDialogOpen(true);
  };
  
  const handleEdit = (item: Event | Achievement, type: 'event' | 'achievement') => {
    setDialogContent(type);
    if(type === 'event') setSelectedEvent(item as Event);
    if(type === 'achievement') setSelectedAchievement(item as Achievement);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string, type: 'event' | 'achievement') => {
    if (type === 'event') {
        await deleteEventAction(id);
        toast({ title: "Success", description: "Event deleted." });
    } else {
        await deleteAchievementAction(id);
        toast({ title: "Success", description: "Achievement deleted." });
    }
  };

  return (
    <Tabs defaultValue="events">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <div className="flex gap-2">
            <Button onClick={() => handleAddNew('event')} className="gap-2"><PlusCircle /> Add Event</Button>
            <Button onClick={() => handleAddNew('achievement')} className="gap-2"><PlusCircle /> Add Achievement</Button>
        </div>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
                {dialogContent === 'event' ? (selectedEvent ? 'Edit Event' : 'Add Event') : (selectedAchievement ? 'Edit Achievement' : 'Add Achievement')}
            </DialogTitle>
          </DialogHeader>
          {dialogContent === 'event' && <EventForm item={selectedEvent} onFinished={() => setDialogOpen(false)} />}
          {dialogContent === 'achievement' && <AchievementForm item={selectedAchievement} onFinished={() => setDialogOpen(false)} />}
        </DialogContent>
      </Dialog>
      
      <TabsContent value="events">
        <div className="space-y-4">
          {initialEvents.map((item) => (
            <Card key={item.id}>
              <CardHeader><CardTitle>{item.title}</CardTitle><CardDescription>{new Date(item.date).toLocaleDateString()}</CardDescription></CardHeader>
              <CardContent><p>{item.description}</p></CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item, 'event')}><Edit className="mr-2 h-4 w-4"/>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id, 'event')}><Trash2 className="mr-2 h-4 w-4"/>Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="achievements">
        <div className="space-y-4">
          {initialAchievements.map((item) => (
            <Card key={item.id}>
              <CardHeader><CardTitle>{item.title}</CardTitle><CardDescription>{item.studentName} - {item.year}</CardDescription></CardHeader>
              <CardContent><p>{item.description}</p></CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item, 'achievement')}><Edit className="mr-2 h-4 w-4"/>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id, 'achievement')}><Trash2 className="mr-2 h-4 w-4"/>Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
