
'use client';
import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const RequestForm = () => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Clothes");
  const router = useRouter();

  const categories = [
    "Clothes",
    "Books",
    "Toys",
    "Electronics",
    "Furniture",
    "Food",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "requested"), {
        item,
        quantity: Number(quantity),
        description,
        category,
        createdAt: Timestamp.now(),
      });
      alert(`Requested ${quantity} x ${item}`);
      setItem("");
      setQuantity(1);
      setDescription("");
      setCategory("Clothes");
      router.refresh();
    } catch (error) {
      console.error("Request failed:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      alert("Failed to request: " + errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 border-2 border-gray-200 rounded-xl bg-white shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Request an Item</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="item" className="block font-bold mb-1">Item Name:</label>
          <input
            id="item"
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block font-bold mb-1">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            className="w-24 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-bold mb-1">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block font-bold mb-1">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md min-h-[60px]"
          />
        </div>

        <button
          type="submit"
          className="mt-2 p-3 bg-blue-600 text-white font-bold rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
        >
          Request Item
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
