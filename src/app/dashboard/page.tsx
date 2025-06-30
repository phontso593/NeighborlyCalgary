
'use client';
import React from "react";

const DashboardPage = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-center text-3xl font-bold mb-2 text-gray-800">Dashboard</h2>
      <p className="text-center text-gray-500 mb-6">Welcome to your item feed!</p>
      <div className="text-center text-gray-400 p-8 border-2 border-dashed rounded-lg">
        <p>Your feed of available donations and requests will appear here soon.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
