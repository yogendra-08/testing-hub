'use client';

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveFacultyAction } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Faculty } from "@/lib/types";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : isEditing ? "Save Changes" : "Add Faculty"}
    </Button>
  );
}

export function FacultyForm({ faculty, onFinished }: { faculty: Faculty | null; onFinished: () => void; }) {
  const [state, formAction] = useActionState(saveFacultyAction, { success: false, message: "" });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({ title: "Success", description: state.message });
      onFinished();
    } else if (state.message) {
      toast({ variant: "destructive", title: "Error", description: state.message });
    }
  }, [state, toast, onFinished]);
  
  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {faculty && <input type="hidden" name="id" value={faculty.id} />}
      {faculty?.photo && <input type="hidden" name="currentPhotoUrl" value={faculty.photo} />}
      
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={faculty?.name} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="designation">Designation</Label>
        <Input id="designation" name="designation" defaultValue={faculty?.designation} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="qualification">Qualification</Label>
        <Input id="qualification" name="qualification" defaultValue={faculty?.qualification} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="photo">Photo</Label>
        <Input id="photo" name="photo" type="file" accept="image/*" />
        {faculty?.photo && <p className="text-xs text-muted-foreground">Leave empty to keep the current photo.</p>}
      </div>

      <div className="flex justify-end gap-2">
         <Button type="button" variant="ghost" onClick={onFinished}>Cancel</Button>
         <SubmitButton isEditing={!!faculty} />
      </div>
    </form>
  );
}
