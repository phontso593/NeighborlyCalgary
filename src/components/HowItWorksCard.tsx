
'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HowItWorksCardProps {
  icon: React.ReactNode;
  title: string;
  href?: string;
  onClick?: () => void;
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({ icon, title, href, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  const cardContent = (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center space-x-4 border border-gray-200 hover:shadow-lg hover:border-blue-500 transition-all duration-300 cursor-pointer h-full">
      <div className="flex-shrink-0">{icon}</div>
      <h3 className="font-semibold text-lg text-blue-700">{title}</h3>
    </div>
  );

  if (href && !onClick) {
    return (
      <Link href={href}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div onClick={handleClick}>
      {cardContent}
    </div>
  );
};

export default HowItWorksCard;
