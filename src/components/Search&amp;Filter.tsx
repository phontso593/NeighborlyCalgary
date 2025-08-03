import React, { useState, useEffect } from "react";
import type { Donation } from "@/types";
import { Search, X, Filter } from "lucide-react";

type SearchAndFilterProps = {
    allDonations: Donation[];
    onFilterChange: (filteredDonations: Donation[]) => void;
};

const categories = ["All", "Clothes", "Books", "Toys", "Electronics", "Furniture", "Food", "Other"];
const conditions = ["All", "New", "Like New", "Gently Used", "Used - Good", "Used - Fair"];

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
    allDonations,
    onFilterChange,
}) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [condition, setCondition] = useState("All");

    const applyFilters = () => {
        const filtered = allDonations.filter((donation) => {
            const matchesCategory =
                category === "All" || (donation.category && donation.category === category);
            
            const matchesCondition =
                condition === "All" || (donation.condition && donation.condition === condition);

            const matchesSearch =
                !search ||
                (donation.title && donation.title.toLowerCase().includes(search.toLowerCase())) ||
                (donation.description && donation.description.toLowerCase().includes(search.toLowerCase()));

            return matchesCategory && matchesCondition && matchesSearch;
        });
        onFilterChange(filtered);
    };

    const clearFilters = () => {
        setSearch("");
        setCategory("All");
        setCondition("All");
        onFilterChange(allDonations);
    };
    
    useEffect(() => {
        applyFilters();
    }, [search, category, condition, allDonations]);


    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Search Input */}
                <div className="sm:col-span-2 lg:col-span-1">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                        Search Donations
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="search"
                            placeholder="e.g., Winter coats..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 pl-4 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>

                {/* Category Select */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                
                {/* Condition Select */}
                <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                        Condition
                    </label>
                    <select
                        id="condition"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
                    >
                        {conditions.map((cond) => (
                            <option key={cond} value={cond}>{cond}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end items-center mt-4 gap-4 border-t pt-4">
                <button
                    onClick={clearFilters}
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                    <X size={16} className="mr-1" />
                    Clear Filters
                </button>
                <button
                    onClick={applyFilters}
                    className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <Filter size={16} className