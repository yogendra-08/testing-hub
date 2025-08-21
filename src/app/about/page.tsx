import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">About the Department</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Pioneering the future of technology through education and innovation.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><Eye /> Our Vision</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            To be a center of excellence in Information Technology and AIML Department education, producing globally competent professionals who are innovative, ethical, and socially responsible. We aim to foster a learning environment that encourages creativity, critical thinking, and a passion for lifelong learning.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><Target /> Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            To provide quality education in Information Technology and AIML Department through a well-structured curriculum, state-of-the-art infrastructure, and experienced faculty. We are committed to developing strong industry-academia linkages to provide students with real-world exposure and opportunities.
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline"><BookOpen /> Department History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>The Department of Information Technology and AIML Department at Government Polytechnic, Nagpur was established in [Year of Establishment] with the objective of imparting quality education in the field of IT and AIML Department. Since its inception, the department has been at the forefront of producing skilled and knowledgeable professionals who have made significant contributions to the industry.</p>
          <p>Over the years, we have grown in strength and stature, continuously updating our curriculum and laboratories to keep pace with the rapid advancements in technology. Our alumni are placed in leading companies worldwide, a testament to the quality of education and training they receive.</p>
        </CardContent>
      </Card>
    </div>
  );
}
