// types/index.ts

// 1. One listing from CoinMarketCap
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

// 2. The entire response object from CoinMarketCap
export interface CoinMarketCapResponse {
  data: CoinMarketCapListing[];
  status: {
    total_count: number;
    // add other fields if needed
  };
}
