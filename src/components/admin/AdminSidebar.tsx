'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Contact,
  Bell,
  Trophy,
  Code,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/actions';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';


const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/dashboard/faculty', label: 'Faculty', icon: Users },
  { href: '/admin/dashboard/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/dashboard/notices', label: 'Notices', icon: Bell },
  { href: '/admin/dashboard/events', label: 'Events & Achievements', icon: Trophy },
  { href: '/admin/dashboard/contact', label: 'Contact Info', icon: Contact },
];

const NavLink = ({ item }: { item: typeof navItems[0] }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  return (
    <Link href={item.href}>
        <Button
          variant={isActive ? 'secondary' : 'ghost'}
          className="w-full justify-start gap-2"
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Button>
    </Link>
  );
};

const SidebarContent = () => (
    <div className="flex h-full flex-col">
    <div className="border-b p-4">
      <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold font-headline">
        <Code className="h-6 w-6 text-primary" />
        <span>GPN IT and AIML Department Admin</span>
      </Link>
    </div>
    <nav className="flex-1 space-y-2 p-4">
      {navItems.map((item) => <NavLink key={item.href} item={item} />)}
    </nav>
    <div className="mt-auto border-t p-4">
      <form action={logout}>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </form>
    </div>
  </div>
)

export default function AdminSidebar() {
  return (
    <>
      <div className="hidden lg:block border-r w-64">
        <SidebarContent />
      </div>
      <div className='lg:hidden p-4 absolute top-0 left-0'>
         <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className='w-64 p-0'>
              <SidebarContent />
            </SheetContent>
          </Sheet>
      </div>
    </>
  );
}
