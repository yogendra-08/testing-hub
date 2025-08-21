import { getContactInfo } from "@/lib/data";
import { ContactForm } from "./ContactForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function ContactAdminPage() {
  const contactInfo = await getContactInfo();
  
  return (
    <div className="space-y-6 max-w-2xl">
      <header>
        <h1 className="text-3xl font-bold font-headline">Manage Contact Information</h1>
        <p className="text-muted-foreground">Update the public contact details for the department.</p>
      </header>
      <Card>
        <CardHeader>
            <CardTitle>Contact Details</CardTitle>
            <CardDescription>This information will be displayed on the public contact page.</CardDescription>
        </CardHeader>
        <CardContent>
            <ContactForm contactInfo={contactInfo} />
        </CardContent>
      </Card>
    </div>
  );
}
