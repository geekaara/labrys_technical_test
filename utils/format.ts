// utils/format.ts

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatMarketCap(value: number) {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)} Bn`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)} Mn`;
  } else {
    return formatCurrency(value);
  }
}

export function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}
