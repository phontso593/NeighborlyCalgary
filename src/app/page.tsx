import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { featuredDonations, testimonials } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-foreground">
              Helping Calgary, One Donation at a Time
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              NeighborlyCalgary is a community-driven platform connecting those who have with those who need. Donate or find essential items for free.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/donations">Browse Donations</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-background">
                <Link href="/how-it-works">Learn How to Help</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="featured" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl font-headline">Featured Items</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-center mt-4">
              Check out some of the latest items available for donation in our community.
            </p>
            <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredDonations.map((item) => (
                <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <CardHeader className="p-0">
                    <Image
                      alt={item.title}
                      className="object-cover w-full h-48"
                      data-ai-hint={item.aiHint}
                      height={225}
                      src={item.imageUrl}
                      width={400}
                    />
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-lg font-bold font-headline">{item.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{item.donor}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant={tag === "Urgent" ? "destructive" : "secondary"}>{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild className="w-full">
                      <Link href="/donations">View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl font-headline">How It Works</h2>
            <div className="grid items-center justify-center gap-6 mt-8 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">1. Donate Items</h3>
                <p className="text-muted-foreground">List items you no longer need. Your generosity can make a huge difference.</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">2. Request Items</h3>
                <p className="text-muted-foreground">Browse listings and request items you need. Connect directly with donors.</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">3. Exchange Safely</h3>
                <p className="text-muted-foreground">Arrange a safe pickup. We provide tips to ensure a smooth exchange.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl font-headline">Community Voices</h2>
            <div className="grid gap-6 mt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="shadow-lg">
                  <CardContent className="p-6">
                    <blockquote className="text-lg italic text-foreground">
                      "{testimonial.quote}"
                    </blockquote>
                    <p className="mt-4 font-semibold text-right text-muted-foreground">- {testimonial.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
