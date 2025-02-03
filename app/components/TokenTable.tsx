import React from "react";
import { useTokens } from "@/hooks/useTokens";
import LoadingSpinner from "./LoadingSpinner";
import TokenTableRow from "./TokenTableRow";

export default function TokenTable() {
  const {
    tokens, // array of token items
    isLoading, // bool
    error, // string | null
    hasMore, // bool
    loadNextPage, // function to fetch the next batch
  } = useTokens();

  // If there's an error, show it
  if (error) {
    return <div className="text-red-600">Error fetching tokens: {error}</div>;
  }

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      {/* Show a spinner during the initial fetch (if no tokens yet) */}
      {isLoading && tokens.length === 0 && (
        <div className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      )}

      {/* Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Name</th>
            <th className="py-2 text-left">Symbol</th>
            <th className="py-2 text-right">Market Cap</th>
            <th className="py-2 text-right">Price (USD)</th>
            <th className="py-2 text-right">24h</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <TokenTableRow key={token.id} token={token} />
          ))}
        </tbody>
      </table>

      {/* Show a spinner if we're fetching more (optional) */}
      {isLoading && tokens.length > 0 && (
        <div className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      )}

      {/* Load More Button */}
      <div className="flex justify-center mt-4">
        {hasMore && !isLoading && (
          <button
            onClick={loadNextPage}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
