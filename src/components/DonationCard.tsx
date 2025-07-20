
import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface DonationCardProps {
  imageUrl: string | StaticImageData;
  imageAlt: string;
  title: string;
  description: string;
  'data-ai-hint'?: string;
}

const DonationCard: React.FC<DonationCardProps> = ({ imageUrl, imageAlt, title, description, 'data-ai-hint': dataAiHint }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          data-ai-hint={dataAiHint}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-blue-800">{title}</h3>
        <p className="text-blue-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default DonationCard;
