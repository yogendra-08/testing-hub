import { getNotices, getAchievements } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Trophy } from "lucide-react";

export default async function StudentsPage() {
  const notices = await getNotices();
  const achievements = await getAchievements();

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Student Zone</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Latest notices, events, and achievements.
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-bold font-headline mb-6 flex items-center gap-3"><Bell className="text-primary"/>Notices</h2>
        <div className="space-y-4">
          {notices.length > 0 ? notices.map(notice => (
            <Card key={notice.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{notice.title}</CardTitle>
                    <CardDescription>{new Date(notice.date).toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge>New</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{notice.content}</p>
              </CardContent>
            </Card>
          )) : <p className="text-muted-foreground">No notices to display.</p>}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline mb-6 flex items-center gap-3"><Trophy className="text-primary"/>Achievements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.length > 0 ? achievements.map(achievement => (
            <Card key={achievement.id}>
              <CardHeader>
                <CardTitle>{achievement.title}</CardTitle>
                <CardDescription>{achievement.studentName} - {achievement.year}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{achievement.description}</p>
              </CardContent>
            </Card>
          )) : <p className="text-muted-foreground md:col-span-2">No achievements to display.</p>}
        </div>
      </section>
    </div>
  );
}
