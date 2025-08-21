import { getNotices } from "@/lib/data";
import { NoticesClient } from "./NoticesClient";

export default async function NoticesAdminPage() {
  const notices = await getNotices();
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">Manage Notices</h1>
        <p className="text-muted-foreground">Create, edit, or delete student notices.</p>
      </header>
      <NoticesClient notices={notices} />
    </div>
  );
}
