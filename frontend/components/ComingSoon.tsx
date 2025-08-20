// pages/coming-soon.tsx
import Link from "next/link";
import React from "react";

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 text-white">
      <div className="text-center px-4">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
          🚀 CloneChamp
        </h1>

        <p className="text-2xl text-gray-300 mb-8">
          Something awesome is on the way...
        </p>

        <div className="animate-pulse text-lg text-indigo-400 mb-12">
          Coming Soon. Stay tuned!
        </div>

        <Link
          href="/problems"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🔎 Explore Problems
        </Link>
      </div>
    </div>
  );
}
