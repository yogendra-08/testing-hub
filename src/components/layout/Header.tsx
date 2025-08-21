'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Code } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Faculty', href: '/faculty' },
  { name: 'Students', href: '/students' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const pathname = usePathname();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn('flex items-center gap-6', className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'nav-link text-sm font-medium',
            pathname === link.href && 'active'
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold font-headline">
            <Code className="h-6 w-6 text-primary" />
            <div className="flex flex-col">
              <span className="text-lg">GPN IT and AIML Department Hub</span>
              <span className="text-xs text-muted-foreground -mt-1">Govt. Polytechnic, Nagpur</span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end">
          <NavLinks />
        </div>

        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <Code className="h-6 w-6 text-primary" />
                <span className="font-bold inline-block font-headline">GPN IT and AIML Department Hub</span>
              </Link>
              <div className="flex flex-col gap-4 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-lg',
                      pathname === link.href ? 'text-primary font-bold' : 'text-muted-foreground'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
