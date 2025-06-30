import { ContactForm } from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Twitter, Facebook, Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Contact Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Have a question or a story to share? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3">
          <ContactForm />
        </div>
        <div className="md:col-span-2">
            <Card className="shadow-lg h-full">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Get in Touch</CardTitle>
                    <CardDescription>
                        Here are other ways you can reach us.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Mail className="w-6 h-6 text-accent" />
                        <a href="mailto:support@neighborlycalgary.com" className="text-foreground hover:text-accent">
                            support@neighborlycalgary.com
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="w-6 h-6 text-accent" />
                        <span className="text-foreground">(403) 555-0123</span>
                    </div>
                    <div className="pt-4">
                        <h4 className="font-semibold mb-2">Follow Us</h4>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" aria-label="Facebook">
                                <Facebook className="w-5 h-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" aria-label="Instagram">
                                <Instagram className="w-5 h-5" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
