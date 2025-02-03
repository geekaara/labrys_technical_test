// hooks/useTokens.ts
"use client";

import { useState, useEffect } from "react";
import { CoinMarketCapListing } from "@/types";

export function useTokens() {
  const [tokens, setTokens] = useState<CoinMarketCapListing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTokens() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/tokens");
      if (!res.ok) {
        throw new Error(
          "Failed to fetch tokens from local /api/tokens endpoint"
        );
      }
      const json = await res.json();
      // Expecting shape: { data: CoinMarketCapListing[] }
      setTokens(json.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTokens();
  }, []);

  return {
    tokens,
    isLoading,
    error,
    refetch: fetchTokens,
  };
}
