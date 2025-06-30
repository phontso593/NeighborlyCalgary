import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, Heart, User, Clock, PlusCircle } from "lucide-react";
import Link from "next/link";

const dashboardSections = [
  {
    icon: <List className="w-6 h-6 text-accent" />,
    title: "My Active Listings",
    description: "View and manage the items you have donated.",
    href: "#",
  },
  {
    icon: <Heart className="w-6 h-6 text-accent" />,
    title: "My Requests",
    description: "Track the items you have requested from others.",
    href: "#",
  },
  {
    icon: <Clock className="w-6 h-6 text-accent" />,
    title: "Donation History",
    description: "See a history of all your past donations and requests.",
    href: "#",
  },
  {
    icon: <User className="w-6 h-6 text-accent" />,
    title: "Edit Profile",
    description: "Update your personal information and password.",
    href: "#",
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">My Dashboard</h1>
          <p className="mt-2 text-muted-foreground md:text-lg">Welcome back, User! Manage your community activity here.</p>
        </div>
        <Button asChild className="mt-4 sm:mt-0">
          <Link href="#">
            <PlusCircle className="mr-2 h-4 w-4" />
            Make a New Donation
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {dashboardSections.map((section) => (
          <Card key={section.title} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              {section.icon}
              <div>
                <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link href={section.href}>Go to {section.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
