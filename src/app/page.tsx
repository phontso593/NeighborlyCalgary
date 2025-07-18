'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import landingImage from '@/assets/logo-landingpage.jpg';
import HowItWorksCard from '@/components/HowItWorksCard';
import DonationCard from '@/components/DonationCard';
import { Gift, Search, Users } from 'lucide-react';

const LandingPage = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white rounded-xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          {/* Left Side: Text and Buttons */}
          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Give Back, Grow Together
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Join our community and make a difference by donating items or
              sharing your stories.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300"
              >
                Sign Up
              </Link>
              <Link
                href="/browse"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300"
              >
                Continue as Guest
              </Link>
            </div>
          </div>
          {/* Right Side: Image */}
          <div className="h-full hidden md:block">
            <Image
              src={landingImage}
              alt="Community donation event"
              data-ai-hint="community event"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="mt-16 md:mt-24">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <HowItWorksCard
            icon={<Gift size={24} className="text-blue-600" />}
            title="Donate Items"
            href="/donate"
          />
          <HowItWorksCard
            icon={<Search size={24} className="text-blue-600" />}
            title="Browse Requests"
            href="/requests"
          />
          <HowItWorksCard
            icon={<Users size={24} className="text-blue-600" />}
            title="Connect with Community"
            href="/about"
          />
        </div>
      </section>

      {/* Featured Donations Section */}
      <section className="mt-16 md:mt-24">
        <h2 className="text-3xl font-bold text-blue-800 mb-8">
          Featured Donations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <DonationCard
            imageUrl="https://firebasestorage.googleapis.com/v0/b/neighborlycalgary.appspot.com/o/pexels-pixabay-159711.jpg?alt=media"
            imageAlt="Books for Education"
            title="Books for Education"
            description="Support local schools with educational materials."
            data-ai-hint="books education"
          />
          <DonationCard
            imageUrl="https://placehold.co/600x400.png"
            imageAlt="Clothing for All Seasons"
            title="Clothing for All Seasons"
            description="Provide essential clothing to those in need."
            data-ai-hint="clothing donation"
          />
          <DonationCard
            imageUrl="https://placehold.co/600x400.png"
            imageAlt="Toys for Children"
            title="Toys for Children"
            description="Bring joy to children with donated toys."
            data-ai-hint="toys children"
          />
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="mt-16 md:mt-24">
        <h2 className="text-3xl font-bold text-blue-800 mb-8">
          Success Stories
        </h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="h-full">
              <Image
                src="https://placehold.co/600x400.png"
                alt="A community success story"
                data-ai-hint="community donation"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">
                A Community United
              </h3>
              <p className="text-blue-700 mb-6">
                Read how our platform helped connect donors with recipients, creating a positive impact in our neighborhood through shared resources and support.
              </p>
              <Link href="/about" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                Read...
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ready to Make a Difference Section */}
      <section className="mt-16 md:mt-24 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Ready to Make a Difference?
        </h2>
        <Link href="/donate" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 inline-block">
          Start Donating
        </Link>
      </section>
    </main>
  );
};

export default LandingPage;
