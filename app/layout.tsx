// app/layout.tsx
import React from "react";
import "./globals.css";

export const metadata = {
  title: "Crypto Tracker",
  description: "Track top cryptocurrencies by market cap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white">AssetTracker</h1>
            <p className="text-white">Track your favourite crypto assets</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
