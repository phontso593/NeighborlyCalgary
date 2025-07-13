
import React from 'react';
import { List, CheckCircle, ArrowRightCircle } from 'lucide-react';

const HowItWorksPage = () => {
  const donatingSteps = [
    {
      title: 'List Your Item',
      description: 'Take a photo and write a short description of the item you\'d like to donate. Set your availability for pickup.',
    },
    {
      title: 'Coordinate Pickup',
      description: 'Once someone requests your item, you\'ll receive a notification. Coordinate a pickup time and location.',
    },
    {
      title: 'Item Donated',
      description: 'Once the item is picked up, mark it as donated in the app. You\'ve made someone\'s day!',
    },
  ];

  const requestingSteps = [
    {
      title: 'Browse Items',
      description: 'Browse the available items in your community. Use filters to find exactly what you need.',
    },
    {
      title: 'Request Item',
      description: 'Found something you like? Request it! The donor will be notified and will coordinate a pickup.',
    },
    {
      title: 'Item Received',
      description: 'Once you receive the item, mark it as received in the app. Enjoy your new treasure!',
    },
  ];

  const TimelineStep = ({ title, description, isLast }: { title: string, description: string, isLast: boolean }) => (
    <div className="flex">
      <div className="flex flex-col items-center mr-6">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white">
          <CheckCircle size={20} />
        </div>
        {!isLast && <div className="w-px h-full bg-gray-300" />}
      </div>
      <div className="pb-10">
        <h4 className="text-lg font-bold text-gray-800 mb-1">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-16">
          How it Works
        </h1>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Donating Items</h2>
          <div>
            {donatingSteps.map((step, index) => (
              <TimelineStep
                key={index}
                title={step.title}
                description={step.description}
                isLast={index === donatingSteps.length - 1}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Requesting Items</h2>
          <div>
            {requestingSteps.map((step, index) => (
              <TimelineStep
                key={index}
                title={step.title}
                description={step.description}
                isLast={index === requestingSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
