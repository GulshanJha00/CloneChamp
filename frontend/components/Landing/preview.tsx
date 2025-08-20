"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Question {
  qNo: number;
  title: string;
  difficulty: string;
  description: string;
  colors: string;
  imageUrl: string;
  solved?: boolean;
}

const Preview = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadQuestion = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/get-question`
      );
      const sortedQuestions = response.data.sort(
        (a: Question, b: Question) => a.qNo - b.qNo
      );
      setQuestions(sortedQuestions.slice(0, 4)); // only preview 3
    };
    loadQuestion();
  }, []);

  return (
    <section className="w-full py-14 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            Try a Challenge
          </h2>
          <p className="text-gray-400 text-sm">
            A quick preview of what you’ll be solving 
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {questions.map((val) => (
            <Link
              key={val.qNo}
              href={`/problems/${val.title}`}
              className="group bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="h-44 w-full bg-gray-900 flex items-center justify-center overflow-hidden border-b border-gray-700">
                <img
                  src={val.imageUrl}
                  alt={val.title}
                  className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-white line-clamp-1">
                    {val.qNo}. {val.title || "No title"}
                  </h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-md ${
                      val.difficulty === "easy"
                        ? "bg-green-600/80 text-white"
                        : val.difficulty === "medium"
                        ? "bg-yellow-400 text-black"
                        : val.difficulty === "hard"
                        ? "bg-red-600 text-white"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    {val.difficulty &&
                      val.difficulty.charAt(0).toUpperCase() +
                        val.difficulty.slice(1)}
                  </span>
                </div>

                <p className="text-sm text-gray-300 mb-5 line-clamp-2">
                  {val.description}
                </p>

                {/* CTA */}
                <button className="mt-auto w-full py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  Start Challenge
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/problems"
            className="inline-block px-6 py-2 text-sm font-medium rounded-lg bg-white text-gray-900 hover:bg-gray-200 transition"
          >
            View All Challenges
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Preview;
