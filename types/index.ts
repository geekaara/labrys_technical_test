// types/index.ts
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
// app/types.ts (or wherever you keep your shared types)

// 1. Describes one token from CoinMarketCap
export interface CoinMarketCapListing {
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

// 2. Describes the entire response object from CoinMarketCap
export interface CoinMarketCapResponse {
  data: CoinMarketCapListing[];
  status: {
    total_count: number;
    // ... other fields if needed
  };
}
