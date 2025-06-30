import { allDonations } from "@/lib/data";
import { DonationListings } from "@/components/donations/donation-listings";

export default function DonationsPage() {
  // In a real app, this would be an API call or database query.
  const donations = allDonations;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Donation Listings</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Browse available items donated by your generous neighbors. Use the filters to find exactly what you need.
        </p>
      </div>
      <DonationListings initialDonations={donations} />
    </div>
  );
}
