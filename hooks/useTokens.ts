"use client";

import { useState, useEffect } from "react";

// 1) Define your data interface (optional, but recommended for clarity):
export interface CryptocurrencyListing {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
      percent_change_24h: number;
    };
  };
}

/**
 * A custom hook to fetch and paginate tokens manually,
 * without depending on React Query's infinite APIs.
 */
export function useTokens() {
  // Local state to track fetched tokens, current page, loading status, etc.
  const [tokens, setTokens] = useState<CryptocurrencyListing[]>([]);
  const [page, setPage] = useState(1); // current page
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true); // whether more data can be loaded

  const limit = 25;

  const fetchPage = async (pageNumber: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const start = (pageNumber - 1) * limit + 1; // e.g. page=1 -> start=1, page=2 -> start=26
      const response = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start}&limit=${limit}&sort=market_cap`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": "1281325f-c9b5-4f1f-99bb-a8d9a3105ad6",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tokens from CoinMarketCap");
      }

      const json = (await response.json()) as {
        data: CryptocurrencyListing[];
        status: { total_count: number };
      };

      // Append new data to existing tokens
      setTokens((prev) => [...prev, ...json.data]);

      // If we got fewer items than 'limit', we assume no more pages
      if (json.data.length < limit) {
        setHasMore(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 3) On mount or whenever 'page' changes, fetch that page
  useEffect(() => {
    fetchPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // 4) Expose a function to load the next page
  const loadNextPage = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  // 5) Return data and actions from this hook
  return { tokens, isLoading, error, hasMore, loadNextPage };
}
