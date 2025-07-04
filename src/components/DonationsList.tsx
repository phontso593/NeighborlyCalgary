'use client';

import React from "react";
import type { Donation } from "@/types";

interface DonationsListProps {
    donations: Donation[];
}

const DonationsList: React.FC<DonationsListProps> = ({ donations }) => {
    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Recent Donations</h3>
            {donations.length === 0 ? (
                <p className="text-center text-gray-500 italic">No donations available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {donations.map(donation => (
                        <div key={donation.id} className="bg-white rounded-lg shadow-md p-5 flex flex-col">
                            <h4 className="text-lg font-bold text-blue-600 mb-2">{donation.item}</h4>
                            <p className="text-green-600 font-semibold mb-2">{donation.quantity} available</p>
                            {donation.description && <p className="text-gray-700 text-sm mb-3">{donation.description}</p>}
                            <div className="mt-auto pt-3 border-t border-gray-200 text-xs text-gray-500">
                                <p><span className="font-semibold">Category:</span> {donation.category}</p>
                                <p>
                                    <span className="font-semibold">Donated on:</span>{" "}
                                    {donation.createdAt?.seconds
                                        ? new Date(donation.createdAt.seconds * 1000).toLocaleDateString()
                                        : "Unknown"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DonationsList;
