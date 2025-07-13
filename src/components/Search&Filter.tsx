import React, { useState, useEffect } from "react";
import type { Donation } from "@/types";
import { Search } from "lucide-react";

type SearchAndFilterProps = {
    allDonations: Donation[];
    onFilterChange: (filteredDonations: Donation[]) => void;
};

const categories = ["All", "Clothes", "Books", "Toys", "Electronics", "Furniture", "Food", "Other"];

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
    allDonations,
    onFilterChange,
}) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        const filtered = allDonations.filter((donation) => {
            const matchesCategory =
                category === "All" || donation.category === category;
            const matchesSearch =
                donation.item.toLowerCase().includes(search.toLowerCase()) ||
                donation.description.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        onFilterChange(filtered);
    }, [search, category, allDonations, onFilterChange]);

    return (
        <div className="max-w-3xl mx-auto my-10 p-8 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Search & Filter Donations</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search donations..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 cursor-pointer"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchAndFilter;
