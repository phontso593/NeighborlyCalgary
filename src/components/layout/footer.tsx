import Link from "next/link";
import { Twitter, Facebook, Instagram } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container grid items-center justify-between gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div className="flex justify-center md:justify-start">
            <Logo />
        </div>
        <div className="flex justify-center gap-4 text-sm font-medium text-muted-foreground">
          <Link href="/about" className="transition-colors hover:text-accent">About</Link>
          <Link href="/donations" className="transition-colors hover:text-accent">Donations</Link>
          <Link href="/contact" className="transition-colors hover:text-accent">Contact</Link>
        </div>
        <div className="flex items-center justify-center gap-2 md:justify-end">
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
      <div className="container flex items-center justify-center py-4 border-t">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} NeighborlyCalgary. All rights reserved.</p>
      </div>
    </footer>
  );
}
