"use client"
import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadWait() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">Please wait...</h2>
        <p className="text-gray-500">We are loading things for you</p>
      </div>
    </div>
  );
}
