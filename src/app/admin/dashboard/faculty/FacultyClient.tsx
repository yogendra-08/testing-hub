'use client';

import type { Faculty } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FacultyForm } from "./FacultyForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteFacultyAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
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


export function FacultyClient({ faculty }: { faculty: Faculty[] }) {
  const [open, setOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const { toast } = useToast();

  const handleEdit = (facultyMember: Faculty) => {
    setSelectedFaculty(facultyMember);
    setOpen(true);
  };

  const handleAddNew = () => {
    setSelectedFaculty(null);
    setOpen(true);
  };
  
  const handleDelete = async (id: string) => {
      const result = await deleteFacultyAction(id);
      if (result.success) {
          toast({ title: "Success", description: result.message });
      } else {
          toast({ variant: "destructive", title: "Error", description: result.message });
      }
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddNew} className="gap-2">
          <PlusCircle /> Add New Faculty
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedFaculty ? "Edit" : "Add"} Faculty Member</DialogTitle>
          </DialogHeader>
          <FacultyForm faculty={selectedFaculty} onFinished={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Qualification</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faculty.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Image src={member.photo || 'https://placehold.co/40x40.png'} alt={member.name} data-ai-hint="person photo" width={40} height={40} className="rounded-full" />
                </TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.designation}</TableCell>
                <TableCell>{member.qualification}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the faculty member's data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(member.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
