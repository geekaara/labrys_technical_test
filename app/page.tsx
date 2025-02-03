"use client";

import { useEffect, useState } from "react";

interface CoinMarketCapListing {
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

export default function HomePage() {
  const [tokens, setTokens] = useState<CoinMarketCapListing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch from /api/tokens once on mount
  useEffect(() => {
    async function fetchTokens() {
      try {
        setIsLoading(true);

        // This hits our local Next.js API route instead of the external CMC endpoint
        const response = await fetch("/api/tokens");
        if (!response.ok) {
          throw new Error("Failed to fetch tokens from /api/tokens");
        }

        // The route returns the same shape as CoinMarketCap (with a 'data' array)
        const json = await response.json();
        setTokens(json.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchTokens();
  }, []);

  // Render states
  if (isLoading) return <div>Loading tokens...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  // Render list of tokens
  return (
    <main style={{ padding: 20 }}>
      <ul>
        {tokens.map((token) => (
          <li key={token.id}>
            <strong>{token.name}</strong> ({token.symbol}) <br />
            Price: ${token.quote.USD.price.toFixed(2)} <br />
            24h Change: {token.quote.USD.percent_change_24h.toFixed(2)}%
          </li>
        ))}
      </ul>
    </main>
  );
}
