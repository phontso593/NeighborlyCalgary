"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Search, ArrowRight, Users } from "lucide-react";
import type { DonationItem } from "@/lib/types";
import { donationCategories, locations } from "@/lib/data";

interface DonationListingsProps {
  initialDonations: DonationItem[];
}

export function DonationListings({ initialDonations }: DonationListingsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");

  const filteredDonations = useMemo(() => {
    return initialDonations.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      const matchesLocation = location === "All" || item.location === location;
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [searchTerm, category, location, initialDonations]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 rounded-lg bg-card border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {donationCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredDonations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDonations.map((item) => (
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
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant={tag === "Urgent" ? "destructive" : "secondary"}>{tag}</Badge>
                  ))}
                </div>
                <CardTitle className="text-lg font-bold font-headline">{item.title}</CardTitle>
                 <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{item.donor}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{item.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                 <Button className="w-full" asChild>
                    <Link href="#">
                        Request Item
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No items match your criteria.</p>
        </div>
      )}
    </div>
  );
}
