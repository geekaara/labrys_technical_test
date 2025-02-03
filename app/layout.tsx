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
      <body className="bg-gray-50 text-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold underline">Crypto Tracker</h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
