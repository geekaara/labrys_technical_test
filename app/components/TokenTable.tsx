// components/TokenTable.tsx
"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import TokenTableRow from "./TokenTableRow";
import { CoinMarketCapListing } from "@/types";
import { sortTokens, SortColumn, SortDirection } from "@/utils/sortTokens";

interface TokenTableProps {
  tokens: CoinMarketCapListing[];
}

export default function TokenTable({ tokens }: TokenTableProps) {
  // Search query state
  const [searchQuery, setSearchQuery] = useState("");

  // Sorting state
  const [sortColumn, setSortColumn] = useState<SortColumn>("marketCap");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Filter tokens by search
  const filtered = tokens.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) || t.symbol.toLowerCase().includes(q)
    );
  });

  // Sort tokens
  const sorted = sortTokens(filtered, sortColumn, sortDirection);

  // Click header to change sort
  function handleHeaderClick(column: SortColumn) {
    if (sortColumn === column) {
      // Toggle direction
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  // Show arrow in the sorted column
  function getSortArrow(col: SortColumn) {
    if (col !== sortColumn) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  }

  return (
    <div className="bg-black p-4 rounded-md shadow-sm">
      {/* Search Bar on top */}
      <SearchBar onSearch={(val) => setSearchQuery(val)} />

      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b hover:bg-gray-700 transition-colors">
            <th
              className="cursor-pointer py-2 text-left"
              onClick={() => handleHeaderClick("name")}
            >
              Name {getSortArrow("name")}
            </th>
            <th
              className="cursor-pointer py-2 text-left"
              onClick={() => handleHeaderClick("symbol")}
            >
              Symbol {getSortArrow("symbol")}
            </th>
            <th
              className="cursor-pointer py-2 text-right"
              onClick={() => handleHeaderClick("marketCap")}
            >
              Market Cap {getSortArrow("marketCap")}
            </th>
            <th
              className="cursor-pointer py-2 text-right"
              onClick={() => handleHeaderClick("price")}
            >
              Price (USD) {getSortArrow("price")}
            </th>
            <th
              className="cursor-pointer py-2 text-right"
              onClick={() => handleHeaderClick("change24h")}
            >
              24h % {getSortArrow("change24h")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((token) => (
            <TokenTableRow key={token.id} token={token} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
