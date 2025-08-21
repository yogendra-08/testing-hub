import { getFaculty, getGallery, getNotices, getEvents, getAchievements } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ImageIcon, Bell, Trophy, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const [faculty, gallery, notices, events, achievements] = await Promise.all([
    getFaculty(),
    getGallery(),
    getNotices(),
    getEvents(),
    getAchievements(),
  ]);

  const stats = [
    { title: "Faculty Members", count: faculty.length, icon: Users, href: "/admin/dashboard/faculty" },
    { title: "Gallery Images", count: gallery.length, icon: ImageIcon, href: "/admin/dashboard/gallery" },
    { title: "Notices", count: notices.length, icon: Bell, href: "/admin/dashboard/notices" },
    { title: "Events", count: events.length, icon: Calendar, href: "/admin/dashboard/events" },
    { title: "Achievements", count: achievements.length, icon: Trophy, href: "/admin/dashboard/events" },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the IT and AIML Department Hub Admin Panel.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
               <Button variant="link" asChild className="p-0 h-auto text-xs text-muted-foreground">
                <Link href={stat.href}>View All</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
           <Button asChild><Link href="/admin/dashboard/faculty">Manage Faculty</Link></Button>
           <Button asChild><Link href="/admin/dashboard/gallery">Manage Gallery</Link></Button>
           <Button asChild><Link href="/admin/dashboard/notices">Manage Notices</Link></Button>
        </CardContent>
      </Card>
    </div>
  );
}
