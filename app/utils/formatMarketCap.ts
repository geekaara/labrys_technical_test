// app/utils/formatMarketCap.ts

export function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e9) {
    // Convert to billions
    return `${(marketCap / 1e9).toFixed(2)} Bn`;
  } else if (marketCap >= 1e6) {
    // Convert to millions
    return `${(marketCap / 1e6).toFixed(2)} Mn`;
  } else {
    return marketCap.toFixed(2);
  }
}
