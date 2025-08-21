import { getFaculty } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { User, Star } from "lucide-react";

export default async function FacultyPage() {
  const faculty = await getFaculty();

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Our Faculty</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Meet the dedicated professionals shaping the future of IT and AIML Department.
        </p>
      </header>

      {faculty.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {faculty.map((member) => (
            <Card key={member.id} className="text-center transition-transform transform hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                    src={member.photo || 'https://placehold.co/200x200.png'}
                    alt={`Photo of ${member.name}`}
                    data-ai-hint="person portrait"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
                <p className="text-primary font-semibold">{member.designation}</p>
                <p className="text-sm text-muted-foreground mt-2">{member.qualification}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Faculty information is not available at the moment. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
