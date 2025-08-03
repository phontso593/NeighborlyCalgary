import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-600">Get In Touch</h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions or need support? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side: Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="John Doe"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Your question or comment..."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Contact Info */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Contact Information</h2>
            <p className="text-gray-600 mb-8">
              You can also reach us through the following channels. We aim to respond within 24-48 business hours.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="flex-shrink-0 h-6 w-6 text-orange-500 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                  <a href="mailto:support@givinghub.example.com" className="text-blue-600 hover:underline break-all">
                    support@neighborly.ca
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="flex-shrink-0 h-6 w-6 text-orange-500 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">(123) 456-7890 (Mon-Fri, 9am-5pm)</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="flex-shrink-0 h-6 w-6 text-orange-500 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Office (By Appointment)</h3>
                  <p className="text-gray-600">
                    123 Community Lane<br />
                    Giving City, ST 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
