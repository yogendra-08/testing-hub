import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Camera, Briefcase, Phone, Building, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const quickLinks = [
    { name: "About Us", href: "/about", icon: Building },
    { name: "Academics", href: "/academics", icon: BookOpen },
    { name: "Faculty", href: "/faculty", icon: Users },
    { name: "Gallery", href: "/gallery", icon: Camera },
    { name: "Students", href: "/students", icon: Briefcase },
    { name: "Contact Us", href: "/contact", icon: Phone },
  ];

  const newsHighlights = [
    {
      title: "Annual Tech Fest 2024",
      description: "A grand success with 300+ participants. Students organized coding, robotics, and quiz competitions, showcasing their technical prowess.",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "tech event",
      tag: "May 2024",
      link: {
        text: "View Photos",
        href: "/gallery"
      }
    },
    {
      title: "Newsletter 2023",
      description: "A special edition where students gifted the newsletter to teachers as a token of respect and appreciation for their guidance.",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "newsletter cover",
      tag: "Past Highlight",
      link: {
        text: "View Newsletter",
        href: "/students"
      }
    },
    {
      title: "Industry Visit",
      description: "Our final year students visited a leading IT and AIML Department firm, gaining insights into corporate work culture and emerging technologies.",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "students industry",
      tag: "March 2024",
      link: {
        text: "Read More",
        href: "#"
      }
    }
  ];

  return (
    <div className="space-y-16">
      <section className="relative h-[60vh] -mt-8 -mx-4 flex items-center justify-center text-center text-white animate-fade-in">
        <Image 
          src="https://placehold.co/1600x900.png"
          alt="Government Polytechnic Nagpur Campus"
          data-ai-hint="college campus"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="z-20 p-4">
          <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
            Welcome to the IT and AIML Department Hub
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/90 drop-shadow-md">
            Department of Information Technology and AIML Department, Government Polytechnic, Nagpur.
            Your gateway to innovation, learning, and excellence in technology.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
            <Button variant="secondary" asChild size="lg">
              <Link href="/academics">Explore Academics</Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold text-center mb-8">
          Explore Our Department
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link) => (
            <Link href={link.href} key={link.href} className="transform transition-transform hover:scale-105">
              <Card className="h-full hover:shadow-xl hover:border-primary/50 transition-all duration-300 bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium font-headline">{link.name}</CardTitle>
                  <link.icon className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Click to explore the {link.name.toLowerCase()} section.
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold text-center mb-8">
          Latest News & Past Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsHighlights.map((item, index) => (
            <Card key={index} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50">
               {item.imageUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    data-ai-hint={item.imageHint}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                  <Badge variant="secondary">{item.tag}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
              <CardFooter>
                 {item.link && (
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={item.link.href} className="flex items-center gap-2">
                      {item.link.text} <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
