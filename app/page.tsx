// app/page.tsx
"use client";

import React from "react";
import { useTokens } from "@/hooks/useTokens";
import LoadingSpinner from "./components/LoadingSpinner";
import TokenTable from "./components/TokenTable";

export default function HomePage() {
  const { tokens, isLoading, error, refetch } = useTokens();

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Error fetching tokens: {error}
        <button
          className="ml-4 px-4 py-2 bg-gray-200 rounded"
          onClick={refetch}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main>
      <TokenTable tokens={tokens} />
    </main>
  );
}
