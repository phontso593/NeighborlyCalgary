import React from 'react';

const HowItWorksPage = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">How It Works</h2>
      <ol className="list-decimal list-inside space-y-4 text-gray-600 leading-relaxed">
        <li>
          <strong>Create an Account:</strong> Sign up for free to join our community of givers and receivers.
        </li>
        <li>
          <strong>List an Item:</strong> If you have something to donate, simply create a listing with a description and photo.
        </li>
        <li>
          <strong>Request an Item:</strong> If you're in need of something, browse the listings or make a request to the community.
        </li>
        <li>
          <strong>Connect and Coordinate:</strong> Communicate with other members to arrange a safe and convenient exchange.
        </li>
        <li>
          <strong>Share Your Story:</strong> Inspire others by sharing your positive experiences on the platform.
        </li>
      </ol>
    </div>
  );
};

export default HowItWorksPage;
