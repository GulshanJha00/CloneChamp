"use client";
import React, { useEffect } from "react";
import ProtectedRoute from "../protectedRoute";
import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Question {
  qNo: number;
  title: string;
  difficulty: string;
  description: string;
  colors: string;
  imageUrl: string;
}

const page = () => {
  const [selected, setSelected] = useState("all");
  const [SearchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const questions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/get-question"
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    questions();
  }, []);

  const filteredSearch = questions.filter((chal) => {
    const matchesSearch =
      chal.title.toLowerCase().includes(SearchQuery.toLowerCase()) ||
      chal.qNo.toString().includes(SearchQuery.toLowerCase());
    const matchesDifficulty =
      selected === "all" || chal.difficulty.toLowerCase() === selected;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <ProtectedRoute>
      <div className="">
        <header className="container flex justify-between items-center border-b border-b-gray-600 pb-4">
          <div className=" flex flex-col pt-4 ">
            <h1 className="text-3xl font-bold">Challanges</h1>
            <h1 className="text-gray-400">
              Solve frontend challenges to improve your skills
            </h1>
          </div>
          <div className="rounded-lg focus-within:outline-double focus:ring-2 flex justify-center items-center px-2 py-2 gap-4 border border-gray-600">
            <Search className="text-white " />
            <input
              type="text"
              name=""
              value={SearchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="focus:outline-none "
              placeholder="Search challanges..."
              id=""
            />
          </div>
        </header>

        <header className="container flex items-center gap-5 border-b border-b-gray-600 py-4">
          <button
            className={
              selected === "all"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-white"
            }
            onClick={() => setSelected("all")}
          >
            All Challanges
          </button>
          <button
            className={
              selected === "easy"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-white"
            }
            onClick={() => setSelected("easy")}
          >
            Easy
          </button>
          <button
            className={
              selected === "medium"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-white"
            }
            onClick={() => setSelected("medium")}
          >
            Medium
          </button>
          <button
            className={
              selected === "hard"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-white"
            }
            onClick={() => setSelected("hard")}
          >
            Hard
          </button>
        </header>

        <main className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
          {filteredSearch.map((val, id) => (
            <Link
              key={id}
              href={`/problems/${val.title}`}
              className="flex flex-col bg-white/5 hover:bg-white/10 border border-gray-700 rounded-xl shadow-md overflow-hidden transition-all duration-300"
            >
              <img
                src={val.imageUrl}
                alt="Alternate"
                className="w-full h-52 object-contain bg-gray-900 p-4 border-b border-gray-700"
              />

              <div className="flex flex-col h-full p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base font-semibold text-white">
                    {val.qNo}. {val.title || "No title"}
                  </h2>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      val.difficulty === "easy"
                        ? "bg-green-600 text-white"
                        : val.difficulty === "medium"
                        ? "bg-yellow-500 text-black"
                        : val.difficulty === "hard"
                        ? "bg-red-600 text-white"
                        : "hidden"
                    }`}
                  >
                    {val.difficulty?.[0]?.toUpperCase() +
                      val.difficulty?.slice(1)}
                  </span>
                </div>

                <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                  {val.description}
                </p>

                <div className="mt-auto pt-2">
                  <button className="w-full py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                    Start Challenge
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default page;
