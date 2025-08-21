import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library, FlaskConical, ClipboardList } from "lucide-react";

export default function AcademicsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Academics</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Our commitment to excellence in technical education.
        </p>
      </header>

      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><Library /> Programs Offered</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>The department offers a comprehensive Diploma program in Information Technology and AIML Department. The program is designed to provide a strong foundation in the principles of computer science and information technology, preparing students for successful careers or higher education.</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Diploma in Information Technology and AIML Department (3 Years)</li>
              <li>Focus on practical, hands-on learning</li>
              <li>Industry-relevant curriculum</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><ClipboardList /> Curriculum</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>Our curriculum is meticulously crafted in alignment with the guidelines of the Maharashtra State Board of Technical Education (MSBTE). It is regularly updated to incorporate the latest trends and technologies in the IT and AIML Department industry.</p>
            <p className="mt-2">Key subjects include Data Structures, Database Management, Web Development, Software Engineering, and Network Security.</p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><FlaskConical /> Laboratories & Facilities</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>The department is equipped with state-of-the-art laboratories that provide students with the necessary hands-on experience. Our labs are powered by modern hardware and equipped with the latest software.</p>
            <ul className="list-disc pl-5 mt-4 grid md:grid-cols-2 gap-2">
              <li>Computer Programming Lab</li>
              <li>Web Development Lab</li>
              <li>Database & Networking Lab</li>
              <li>Software Engineering Lab</li>
              <li>Project Development Lab</li>
              <li>High-speed internet connectivity</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
