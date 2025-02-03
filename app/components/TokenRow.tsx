// app/components/TokenRow.tsx

import Image from "next/image";
import { formatMarketCap } from "../utils/formatMarketCap";

type TokenData = {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      market_cap: number;
    };
  };
};

// Map from symbol to icon filename from the cryptocurrency-icons package
// For demonstration, you could place the icons in /public/crypto-icons
const iconMapper: Record<string, string> = {
  BTC: "/crypto-icons/color/btc.png",
  ETH: "/crypto-icons/color/eth.png",
  // Add more if needed, or handle fallback logic
};

export function TokenRow({ token }: { token: TokenData }) {
  const { name, symbol, quote } = token;
  const price = quote?.USD?.price || 0;
  const marketCap = quote?.USD?.market_cap || 0;

  const imageSrc =
    iconMapper[symbol.toUpperCase()] || "/crypto-icons/generic.png";

  return (
    <div className="flex items-center py-3 border-b border-gray-200 last:border-0">
      <div className="w-12 h-12 relative mr-3">
        <Image
          src={imageSrc}
          alt={symbol}
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-semibold text-gray-700">
          {name} ({symbol})
        </span>
        <span className="text-gray-500 text-sm">
          Market Cap: {formatMarketCap(marketCap)}
        </span>
      </div>
      <div className="ml-auto text-right">
        <p className="font-medium">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
