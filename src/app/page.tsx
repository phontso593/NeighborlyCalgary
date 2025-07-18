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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
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
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Featured Donations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <DonationCard
            imageUrl="https://placehold.co/600x400.png"
            imageAlt="Children's Toys"
            title="Children's Toys"
            description="Gently used toys for all ages."
            data-ai-hint="children toys"
          />
          <DonationCard
            imageUrl="https://placehold.co/600x400.png"
            imageAlt="Winter Clothes"
            title="Winter Clothes"
            description="Warm jackets and sweaters for families in need."
            data-ai-hint="winter clothes"
          />
          <DonationCard
            imageUrl="https://placehold.co/600x400.png"
            imageAlt="Book Collection"
            title="Book Collection"
            description="A variety of books for all ages."
            data-ai-hint="books collection"
          />
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
