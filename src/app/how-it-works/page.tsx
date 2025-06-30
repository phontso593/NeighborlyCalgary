import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Gift, HandHeart, Search, ShieldCheck, Smile } from "lucide-react";

const donationSteps = [
    {
        icon: <Gift className="w-8 h-8" />,
        title: "List Your Item",
        description: "Take a clear photo and write a simple description of the item you want to donate. Post it in the right category."
    },
    {
        icon: <Smile className="w-8 h-8" />,
        title: "Connect with a Requester",
        description: "You'll receive a notification when someone is interested. Chat with them to confirm they're a good fit."
    },
    {
        icon: <HandHeart className="w-8 h-8" />,
        title: "Arrange Pickup",
        description: "Coordinate a safe and convenient time and public place for the item exchange. Your generosity completes the circle!"
    }
];

const requestSteps = [
    {
        icon: <Search className="w-8 h-8" />,
        title: "Browse & Find",
        description: "Use our search and filters to find items you need. Read the descriptions carefully."
    },
    {
        icon: <CheckCircle className="w-8 h-8" />,
        title: "Make a Request",
        description: "Click the 'Request Item' button and send a polite message to the donor explaining why you need the item."
    },
    {
        icon: <HandHeart className="w-8 h-8" />,
        title: "Arrange Pickup",
        description: "Coordinate a safe and convenient time and public place for the item exchange. Enjoy your new item!"
    }
];


export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">How It Works</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            Joining our community is easy. Follow these simple steps to start donating or requesting items.
        </p>
      </div>

      <div className="space-y-16">
        <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-center mb-8">How to Donate</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {donationSteps.map((step, index) => (
                    <Card key={index} className="text-center shadow-lg">
                        <CardHeader className="flex flex-col items-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                {step.icon}
                            </div>
                            <CardTitle className="font-headline text-xl">{index + 1}. {step.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-center mb-8">How to Request an Item</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {requestSteps.map((step, index) => (
                    <Card key={index} className="text-center shadow-lg">
                        <CardHeader className="flex flex-col items-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                {step.icon}
                            </div>
                            <CardTitle className="font-headline text-xl">{index + 1}. {step.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
        
        <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-center mb-8">Safety Tips for Exchanges</h2>
            <Card className="shadow-lg bg-primary/10">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="w-10 h-10 text-accent" />
                        <CardTitle className="font-headline text-2xl">Your Safety is Our Priority</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4 text-muted-foreground list-disc list-inside">
                        <li><strong>Meet in Public:</strong> Always arrange to meet in a well-lit, public place, like a coffee shop, library, or police station parking lot.</li>
                        <li><strong>Bring a Friend:</strong> If possible, take a friend or family member with you for the exchange.</li>
                        <li><strong>Trust Your Instincts:</strong> If something feels off, it's okay to cancel the exchange. Your safety comes first.</li>
                        <li><strong>Keep Communication on Platform:</strong> Use our messaging system to communicate. Avoid sharing personal contact information until you're comfortable.</li>
                        <li><strong>Inspect Items:</strong> For items like car seats or electronics, make sure to inspect them for safety and functionality before accepting.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
