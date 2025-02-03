// utils/sortTokens.ts
import { CoinMarketCapListing } from "@/types";

export type SortColumn =
  | "name"
  | "symbol"
  | "marketCap"
  | "price"
  | "change24h";
export type SortDirection = "asc" | "desc";

export function sortTokens(
  tokens: CoinMarketCapListing[],
  column: SortColumn,
  direction: SortDirection
): CoinMarketCapListing[] {
  const sorted = [...tokens];
  sorted.sort((a, b) => {
    let valA: string | number;
    let valB: string | number;

    switch (column) {
      case "name":
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
        break;
      case "symbol":
        valA = a.symbol.toLowerCase();
        valB = b.symbol.toLowerCase();
        break;
      case "marketCap":
        valA = a.quote.USD.market_cap;
        valB = b.quote.USD.market_cap;
        break;
      case "price":
        valA = a.quote.USD.price;
        valB = b.quote.USD.price;
        break;
      case "change24h":
        valA = a.quote.USD.percent_change_24h;
        valB = b.quote.USD.percent_change_24h;
        break;
      default:
        return 0;
    }

    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });
  return sorted;
}
