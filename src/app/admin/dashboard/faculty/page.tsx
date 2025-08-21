import { getFaculty } from "@/lib/data";
import { FacultyClient } from "./FacultyClient";

export default async function FacultyAdminPage() {
  const faculty = await getFaculty();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">Manage Faculty</h1>
        <p className="text-muted-foreground">Add, edit, or remove faculty members.</p>
      </header>
      <FacultyClient faculty={faculty} />
    </div>
  );
}
