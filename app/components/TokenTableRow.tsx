import React from "react";
import { CryptocurrencyListing } from "@/types"; // single import of your interface
import { formatCurrency, formatMarketCap, formatPercent } from "@/utils/format";

type TokenTableRowProps = {
  token: CryptocurrencyListing;
};

export default function TokenTableRow({ token }: TokenTableRowProps) {
  const { name, symbol, quote } = token;
  const price = quote.USD.price;
  const marketCap = quote.USD.market_cap;
  const change24h = quote.USD.percent_change_24h;

  const isPositive = change24h >= 0;

  return (
    <tr className="border-b hover:bg-gray-100 transition-colors">
      {/* Token Name + (Optional) Icon */}
      <td className="py-2">
        <div className="flex items-center space-x-2">
          {/* <img src={`/icons/${symbol.toLowerCase()}.png`} alt={symbol} className="w-5 h-5" /> */}
          <span>{name}</span>
        </div>
      </td>
      <td className="py-2">{symbol}</td>
      <td className="py-2 text-right">{formatMarketCap(marketCap)}</td>
      <td className="py-2 text-right">{formatCurrency(price)}</td>
      <td className="py-2 text-right">
        <span
          className={`inline-flex items-center ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 13l5-5 5 5H3z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 mr-1 rotate-180"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 13l5-5 5 5H3z" />
            </svg>
          )}
          {formatPercent(change24h)}
        </span>
      </td>
    </tr>
  );
}
