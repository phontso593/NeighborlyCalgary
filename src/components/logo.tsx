import { HandHeart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <HandHeart className="h-8 w-8 text-accent group-hover:text-accent/90 transition-colors" />
      <span className="text-xl font-bold font-headline text-foreground group-hover:text-foreground/90 transition-colors">
        NeighborlyCalgary
      </span>
    </Link>
  );
}
