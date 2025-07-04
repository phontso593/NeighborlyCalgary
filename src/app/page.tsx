'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ToyBrick, Shirt, BookOpen } from 'lucide-react';
import landingImage from '@/assets/logo-landingpage.jpg';

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-blue-100 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="font-semibold text-lg mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

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
                href="/dashboard"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300"
              >
                Continue as Guest
              </Link>
            </div>
          </div>
          {/* Right Side: Image */}
          <div className="h-full">
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

      {/* Featured Donations Section */}
      <section className="mt-16 md:mt-24">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
          Featured Donations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<ToyBrick size={40} />}
            title="Children's Toys"
            description="Gently used toys for ages 3-7 available for donation."
          />
          <FeatureCard
            icon={<Shirt size={40} />}
            title="Winter Clothes"
            description="Warm jackets and sweaters for families in need."
          />
          <FeatureCard
            icon={<BookOpen size={40} />}
            title="Books"
            description="A variety of books for all ages, ready to inspire."
          />
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
