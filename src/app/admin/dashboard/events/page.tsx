import { getEvents, getAchievements } from "@/lib/data";
import { EventsClient } from "./EventsClient";

export default async function EventsAdminPage() {
  const events = await getEvents();
  const achievements = await getAchievements();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">Manage Events & Achievements</h1>
        <p className="text-muted-foreground">Keep track of departmental events and student achievements.</p>
      </header>
      <EventsClient initialEvents={events} initialAchievements={achievements} />
    </div>
  );
}
