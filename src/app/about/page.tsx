
import React from 'react';
import Image from 'next/image';
import phontsoImage from '@/assets/phontso.png';
import impactImage from '@/assets/pexels-shkrabaanthony-7345444.jpg';

const CollaborationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
    <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
  </svg>
);

const IntegrityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
    <path d="M119.76,217.94A8,8,0,0,1,112,224a8.13,8.13,0,0,1-2-.24l-32-8a8,8,0,0,1-2.5-1.11l-24-16a8,8,0,1,1,8.88-13.31l22.84,15.23,30.66,7.67A8,8,0,0,1,119.76,217.94Zm132.69-96.46a15.89,15.89,0,0,1-8,9.25l-23.68,11.84-55.08,55.09a8,8,0,0,1-7.6,2.1l-64-16a8.06,8.06,0,0,1-2.71-1.25L35.86,142.87,11.58,130.73a16,16,0,0,1-7.16-21.46L29.27,59.58h0a16,16,0,0,1,21.46-7.16l22.06,11,53-15.14a8,8,0,0,1,4.4,0l53,15.14,22.06-11a16,16,0,0,1,21.46,7.16l24.85,49.69A15.9,15.9,0,0,1,252.45,121.48Zm-46.18,12.94L179.06,80H147.24L104,122c12.66,8.09,32.51,10.32,50.32-7.63a8,8,0,0,1,10.68-.61l34.41,27.57Zm-187.54-18,17.69,8.85L61.27,75.58,43.58,66.73ZM188,152.66l-27.71-22.19c-19.54,16-44.35,18.11-64.91,5a16,16,0,0,1-2.72-24.82.6.6,0,0,1,.08-.08L137.6,67.06,128,64.32,77.58,78.73,50.21,133.46l49.2,35.15,58.14,14.53Zm49.24-36.24L212.42,66.73l-17.69,8.85,24.85,49.69Z"></path>
  </svg>
);

const SustainabilityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM105.32,43A142.39,142.39,0,0,0,85.06,88H49.63A88.37,88.37,0,0,1,105.32,43ZM49.63,168H85.06a142.39,142.39,0,0,0,20.26,45A88.37,88.37,0,0,1,49.63,168Zm101.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Z"></path>
  </svg>
);


const AboutPage = () => {
  return (
    <div className="bg-white text-blue-700 font-sans">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800">About Us</h2>
          <p className="mt-4 text-base text-blue-600 max-w-3xl">
            Neighbourly is a non-profit organization dedicated to fostering positive change and empowering communities through collaborative initiatives. Our mission is to create a more equitable and sustainable world by addressing critical social and environmental challenges.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800">Our Mission</h2>
          <p className="mt-4 text-base text-blue-600">
            We strive to unite individuals, organizations, and resources to tackle pressing issues such as poverty, inequality, climate change, and access to education and healthcare. By promoting collaboration and innovation, we aim to build resilient and thriving communities where everyone has the opportunity to reach their full potential.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800">Our Impact</h2>
          <p className="mt-4 text-base text-blue-600">
            Since our inception, Neighbourly has made a significant impact in numerous communities. We have successfully implemented projects that have provided clean water to underserved areas, supported educational programs for children, and promoted sustainable agricultural practices. Our work has touched the lives of thousands of individuals, fostering hope and creating lasting positive change.
          </p>
        </div>

        <div className="w-full aspect-video rounded-xl overflow-hidden mb-12 shadow-lg">
          <Image 
            src={impactImage}
            alt="Community Impact"
            data-ai-hint="community charity"
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 text-center">Our Team</h2>
          <p className="mt-4 text-base text-blue-600 text-center max-w-3xl mx-auto">
            Our team is composed of passionate and dedicated individuals who bring a wealth of experience and expertise to our work. We are united by a shared commitment to making a difference and creating a better future for all. Our diverse backgrounds and skills enable us to approach challenges from multiple perspectives and develop innovative solutions.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            <div className="flex flex-col items-center">
              <h3 className="mt-4 text-lg font-bold text-blue-800">Ruben Macalma </h3>
              <p className="text-sm text-blue-500">Front-end and Back-end coder</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="mt-4 text-lg font-bold text-blue-800">Jaspreet Kaur </h3>
              <p className="text-sm text-blue-500">Front-end and Back-end coder</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="mt-4 text-lg font-bold text-blue-800">Phontso Tsetan </h3>
              <p className="text-sm text-blue-500">Team Leader and Backend manager</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="mt-4 text-lg font-bold text-blue-800">Juan Buritica</h3>
              <p className="text-sm text-blue-500">Front-end Designe</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="mt-4 text-lg font-bold text-blue-800">Nathalie Sales</h3>
              <p className="text-sm text-blue-500">Marketing and Designe</p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 text-center">Our Values</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-blue-200 bg-blue-50 shadow-sm">
              <div className="text-blue-600 mb-3"><CollaborationIcon /></div>
              <h3 className="text-lg font-bold text-blue-800">Collaboration</h3>
              <p className="mt-1 text-sm text-blue-600">We believe in the power of working together to achieve common goals.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-blue-200 bg-blue-50 shadow-sm">
              <div className="text-blue-600 mb-3"><IntegrityIcon /></div>
              <h3 className="text-lg font-bold text-blue-800">Integrity</h3>
              <p className="mt-1 text-sm text-blue-600">We are committed to transparency, accountability, and ethical conduct in all our actions.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-blue-200 bg-blue-50 shadow-sm">
              <div className="text-blue-600 mb-3"><SustainabilityIcon /></div>
              <h3 className="text-lg font-bold text-blue-800">Sustainability</h3>
              <p className="mt-1 text-sm text-blue-600">We strive to create solutions that are environmentally and socially responsible.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-800">Contact Us</h2>
          <p className="mt-4 text-base text-blue-600">
            We would love to hear from you! If you have any questions, suggestions, or would like to get involved, please don't hesitate to reach out to us. You can contact us via email at contact@neighbourly.com or by phone at (555) 123-4567. We look forward to connecting with you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
