"use client";
import React from "react";
import Problems from "@/components/problem/Problems";

const Page = () => {
  return (
    <>
      <div className="lg:hidden fixed inset-0 flex items-center justify-center bg-black text-white z-50 p-4 text-center">
        <div className="bg-white/10 border border-white/20 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-sm">
          <h2 className="text-xl font-bold mb-2">
            Desktop Experience Required
          </h2>
          <p className="text-sm text-gray-300">
            CampCode is optimized for larger screens. Please access from a
            desktop.
          </p>
        </div>
      </div>
      <div className="lg:block">
        <Problems />
    </div>
    </>
  );
};

export default Page;
