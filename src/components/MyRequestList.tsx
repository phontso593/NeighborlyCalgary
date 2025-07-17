"use client";
import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Tag, CalendarDays, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Request } from "@/types";


interface MyRequestListProps {
    requests: Request[];
}

const MyRequestList: React.FC<MyRequestListProps> = ({ requests }) => {
    const { toast } = useToast();

    const handleDelete = async (request: Request) => {
        if (!confirm(`Are you sure you want to delete the request for "${request.item}"?`)) {
            return;
        }
        try {
            await deleteDoc(doc(db, "requested", request.id));
            toast({ title: "Success!", description: `Request for "${request.item}" deleted.` });
        } catch (error) {
            console.error("Error deleting request:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            toast({ variant: "destructive", title: "Deletion Failed", description: errorMessage });
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {requests.length === 0 ? (
                <p className="text-center text-gray-500 italic">You have not made any requests yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {requests.map(request => (
                        <div key={request.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{request.item}</h3>
                                <div className="space-y-2 text-sm text-gray-600 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Tag size={16} className="text-gray-500"/>
                                        <span>{request.category}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Qty:</span>
                                        <span>{request.quantity}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={16} className="text-gray-500"/>
                                        <span>
                                            {request.createdAt?.seconds
                                                ? new Date(request.createdAt.seconds * 1000).toLocaleDateString()
                                                : "N/A"}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-gray-700 text-sm mb-4">{request.description}</div>
                                <button
                                    onClick={() => handleDelete(request)}
                                    className="w-full mt-auto bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRequestList;
