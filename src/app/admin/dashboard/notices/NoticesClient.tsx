"use client";

import type { Notice } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { deleteNoticeAction, saveNoticeAction } from "@/app/actions";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function NoticeForm({ notice, onFinished }: { notice: Notice | null, onFinished: () => void }) {
  const { toast } = useToast();
  
  async function handleSubmit(formData: FormData) {
    const data = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      date: new Date().toISOString(),
    };
    
    await saveNoticeAction(data, notice?.id);
    toast({ title: "Success", description: "Notice saved." });
    onFinished();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={notice?.title} required />
      </div>
      <div className="space-y-1">
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" defaultValue={notice?.content} required />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onFinished}>Cancel</Button>
        <Button type="submit">Save Notice</Button>
      </div>
    </form>
  )
}

export function NoticesClient({ notices }: { notices: Notice[] }) {
  const [open, setOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const { toast } = useToast();

  const handleEdit = (notice: Notice) => {
    setSelectedNotice(notice);
    setOpen(true);
  };

  const handleAddNew = () => {
    setSelectedNotice(null);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteNoticeAction(id);
    toast({ title: "Success", description: "Notice deleted." });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddNew} className="gap-2">
          <PlusCircle /> Add New Notice
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedNotice ? "Edit" : "Add"} Notice</DialogTitle>
          </DialogHeader>
          <NoticeForm notice={selectedNotice} onFinished={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <div className="space-y-4">
        {notices.map((notice) => (
          <Card key={notice.id}>
            <CardHeader>
              <CardTitle>{notice.title}</CardTitle>
              <CardDescription>{new Date(notice.date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{notice.content}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(notice)}>
                <Edit className="h-4 w-4 mr-2"/> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(notice.id)}>
                <Trash2 className="h-4 w-4 mr-2"/> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
