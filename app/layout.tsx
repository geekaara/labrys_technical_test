// app/layout.tsx

import "./globals.css";
import { ReactQueryProvider } from "./react-query-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Crypto Tokens",
  description: "View top cryptocurrencies by market cap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <ReactQueryProvider>
          <main className="min-h-screen flex justify-center p-4">
            <div className="w-full max-w-5xl">{children}</div>
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
