import { getContactInfo } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default async function ContactPage() {
  const contactInfo = await getContactInfo();

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Contact Us</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          We'd love to hear from you. Get in touch with us.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Our Location & Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-muted-foreground">{contactInfo.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <a href={`mailto:${contactInfo.email}`} className="text-muted-foreground hover:text-primary">{contactInfo.email}</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-muted-foreground">{contactInfo.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
       <div className="rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.574421148814!2d79.05586181540237!3d21.1295326859438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0e5a3d204ab%3A0x62a1bf0525def5f5!2sGovernment%20Polytechnic%20Nagpur!5e0!3m2!1sen!2sin!4v1619356168565!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          title="Google Maps Location of Institute of Technology Nagpur"
        ></iframe>
      </div>
    </div>
  );
}
