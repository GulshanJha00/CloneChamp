"use client";

import { Lock, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

const DeveloperPage = () => {
  return (
    <section className="w-full min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="text-center">
        <Terminal className="w-12 h-12 text-green-400 mb-3 animate-pulse mx-auto" />
        
        <p className="text-sm sm:text-base text-gray-400">
          🔒 Developer Zone — access restricted GOMEN ne! (＞﹏＜)
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          This lab will <span className="text-green-400">never</span> open…  
          but at least you found it! (＾▽＾)
        </p>
        <Lock className="w-6 h-6 text-gray-500 mt-4 mx-auto animate-shake" />

        {/* Continue Button */}
        <Link
          href="/developer/problems"
          className="inline-flex items-center mt-6 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm sm:text-base font-medium transition animate-pulse"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default DeveloperPage;
