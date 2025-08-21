"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { saveContactInfoAction } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ContactInfo } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

export function ContactForm({ contactInfo }: { contactInfo: ContactInfo }) {
  const [state, formAction] = useActionState(saveContactInfoAction, { success: false, message: "" });
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({ title: "Success", description: state.message });
    } else if (state.message) {
      toast({ variant: "destructive", title: "Error", description: state.message });
    }
  }, [state, toast]);
  
  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" defaultValue={contactInfo?.address} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" defaultValue={contactInfo?.email} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" defaultValue={contactInfo?.phone} required />
      </div>

      <div className="flex justify-end">
         <SubmitButton />
      </div>
    </form>
  );
}
