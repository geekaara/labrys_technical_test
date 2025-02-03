// components/LoadingSpinner.tsx
import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <span>Loading...</span>
    </div>
  );
}
