// components/SearchBar.tsx
"use client";

import React, { useEffect, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  delay?: number;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search tokens...",
  delay = 300,
}: SearchBarProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(text.trim());
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, onSearch, delay]);

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
      {text && (
        <button
          onClick={() => {
            setText("");
            onSearch("");
          }}
          className="text-sm text-gray-500 hover:underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}
