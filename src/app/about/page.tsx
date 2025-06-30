import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/data";
import { HandHeart, Users, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">About NeighborlyCalgary</h1>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-lg">
          We believe in the power of community to uplift and support its members. Learn about our journey and the people making it happen.
        </p>
      </div>

      <section className="mb-16">
        <Card className="shadow-lg bg-primary/10 border-primary/20">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-center mb-6">Our Mission</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Target className="w-12 h-12 mb-4 text-accent"/>
                <h3 className="text-xl font-bold font-headline">Reduce Waste</h3>
                <p className="text-muted-foreground mt-2">Give pre-loved items a new home and reduce landfill waste in Calgary.</p>
              </div>
              <div className="flex flex-col items-center">
                <HandHeart className="w-12 h-12 mb-4 text-accent"/>
                <h3 className="text-xl font-bold font-headline">Support Neighbors</h3>
                <p className="text-muted-foreground mt-2">Provide essential goods to individuals and families facing hardship, free of charge.</p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 mb-4 text-accent"/>
                <h3 className="text-xl font-bold font-headline">Build Community</h3>
                <p className="text-muted-foreground mt-2">Foster a culture of generosity, connection, and mutual support across the city.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-center mb-8">Our Founder</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <Image
            alt="Founder of NeighborlyCalgary"
            className="rounded-full object-cover"
            data-ai-hint="portrait woman"
            height={200}
            src="https://placehold.co/200x200.png"
            width={200}
          />
          <div className="text-center md:text-left max-w-2xl">
            <h3 className="text-2xl font-bold font-headline">Sarah Chen</h3>
            <p className="text-accent font-semibold">Community Organizer & Founder</p>
            <p className="mt-4 text-muted-foreground">
              "After years of working in local nonprofits, I saw a gap between people who wanted to give and those who needed help. I created NeighborlyCalgary to be that bridge. It's more than a platform; it's a movement to make Calgary a more caring and connected city, neighbor by neighbor."
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-center mb-8">Community Impact Stories</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
      </section>
    </div>
  );
}
