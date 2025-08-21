import Link from 'next/link';
import { Code, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Code className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for the Department of Information Technology and AIML, Institute of Technology.
            <br className="md:hidden" /> This is a demo site for illustrative purposes.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:items-end">
          <div>© {currentYear} Yogendra Bhange & Prathmesh Saharkar</div>
          <div className="flex items-center gap-1">
            <Github className="h-4 w-4" />
            <Link 
              href="https://github.com/yogendra-08/testing-hub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              View repository
            </Link>
          </div>
          <Link href="/admin" className="hover:text-primary transition-colors">
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
