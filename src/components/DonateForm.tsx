'use client';
import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { PackagePlus } from "lucide-react";

const DonateForm = () => {
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const categories = [
    "Clothes",
    "Books",
    "Toys",
    "Electronics",
    "Furniture",
    "Food",
    "Other",
  ];

  const conditions = [
    "New",
    "Like New",
    "Gently Used",
    "Used - Good",
    "Used - Fair",
    "Refurbished"
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to make a donation.");
      router.push("/login");
      return;
    }
    try {
      await addDoc(collection(db, "donations"), {
        item,
        description,
        category,
        condition,
        createdAt: Timestamp.now(),
        uid: user.uid,
        donorName: user.displayName || 'Anonymous',
      });
      alert(`Donated ${item}`);
      setItem("");
      setDescription("");
      setCategory("");
      setCondition("");
      router.refresh();
    } catch (error) {
      console.error("Donation failed:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      alert("Failed to donate: " + errorMessage);
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-blue-600">Add New Donation</h1>
            <p className="mt-2 text-lg text-gray-600">Share your items with the community.</p>
        </div>
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Donation Details</h2>
            <p className="text-gray-600 mb-6">Please fill out the form below to list your item.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="item" className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
                    <input
                        id="item"
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        required
                        placeholder="e.g., Winter Jacket, Set of Novels"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide details about the item, its condition, size, etc."
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="" disabled>Select category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                        <select
                            id="condition"
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="" disabled>Select condition</option>
                            {conditions.map((cond) => (
                                <option key={cond} value={cond}>{cond}</option>
                            ))}
                        </select>
                    </div>
                </div>

                 <div>
                    <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                    <input
                        id="imageUpload"
                        type="file"
                        className="w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-md file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-blue-50 file:text-blue-700
                                   hover:file:bg-blue-100"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 p-3 bg-blue-600 text-white font-bold rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                >
                    <PackagePlus size={20} />
                    Submit Donation
                </button>
            </form>
        </div>
    </div>
  );
};

export default DonateForm;
