import React, { useState } from "react";
import type { Donation } from "@/types";

type SearchAndFilterProps = {
    donations: Donation[];
    onSelectDonation?: (donation: Donation) => void;
};

const categories = ["All", "Clothing", "Food", "Books", "Toys", "Other"];

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
    donations,
    onSelectDonation,
}) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const filteredDonations = donations.filter((donation) => {
        const matchesCategory =
            category === "All" || donation.category === category;
        const matchesSearch =
            donation.item.toLowerCase().includes(search.toLowerCase()) ||
            donation.description.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div style={{ maxWidth: 800, margin: "2rem auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", padding: 40 }}>
            <h2 style={{ textAlign: "center", marginBottom: 24, color: "#2d3748", fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>Search & Filter Donations</h2>
            <div style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "center", flexWrap: "wrap" }}>
                <input
                    type="text"
                    placeholder="🔍 Search donations..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "10px 14px",
                        border: "1px solid #cbd5e1",
                        borderRadius: 8,
                        fontSize: 16,
                        outline: "none",
                        transition: "border 0.2s",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                    }}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                        padding: "10px 14px",
                        border: "1px solid #cbd5e1",
                        borderRadius: 8,
                        fontSize: 16,
                        background: "#f9fafb",
                        cursor: "pointer",
                    }}
                >
                    {categories.map((cat) => (
                        <option key={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {filteredDonations.map((donation) => (
                    <li
                        key={donation.id}
                        style={{
                            cursor: onSelectDonation ? "pointer" : "default",
                            background: "#f1f5f9",
                            borderRadius: 10,
                            marginBottom: 16,
                            padding: 18,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                            transition: "background 0.2s, box-shadow 0.2s",
                        }}
                        onClick={() => onSelectDonation?.(donation)}
                        onMouseOver={e => (e.currentTarget.style.background = "#e2e8f0")}
                        onMouseOut={e => (e.currentTarget.style.background = "#f1f5f9")}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontWeight: 600, fontSize: 18, color: "#1a202c" }}>{donation.item}</span>
                            <span style={{ background: "#38b2ac", color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 13, fontWeight: 500 }}>{donation.category}</span>
                        </div>
                        <div style={{ fontSize: 15, color: "#4a5568", marginTop: 6 }}>{donation.description}</div>
                    </li>
                ))}
                {filteredDonations.length === 0 && (
                    <li style={{ textAlign: "center", color: "#a0aec0", fontSize: 18, marginTop: 32 }}>
                        No donations found.
                    </li>
                )}
            </ul>
        </div>
    );
};

export default SearchAndFilter;
