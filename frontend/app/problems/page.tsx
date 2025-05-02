"use client";
import React from "react";
import ProtectedRoute from "../protectedRoute";
import data from "./problemsData";
import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const page = () => {
  const [selected, setSelected] = useState("all");
  const [SearchQuery, setSearchQuery] = useState("");

  const filteredSearch = data.filter((chal) => {
    const matchesSearch =
      chal.title.toLowerCase().includes(SearchQuery.toLowerCase()) ||
      chal.id.toString().includes(SearchQuery.toLowerCase());
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

        <main className="container grid grid-cols-3 py-10 gap-10">

          {filteredSearch.map((val, id) => (
            <div
              key={id}
              className="h-full w-full hover:scale-[1.02] transition-all ease-linear p-4 bg-gray-800 rounded-xl"
            >
              <Link className="cursor-pointer" href={`/problems/${val.title.toLowerCase().trim().replace(/\s+/g, '-')}`}>
                <img
                  className="h-60 w-96 py-2 rounded-lg"
                  src={val.image}
                  alt=""
                />
                <div className="flex justify-between mb-4  items-center">
                  <h1 className="text-xl font-bold">
                    {val.id}. {val.title}
                  </h1>
                  <p
                    className={`text-xs border rounded-lg px-2 py-1 ${
                      val.difficulty === "Easy"
                        ? "bg-sky-500"
                        : val.difficulty === "Medium"
                        ? "bg-amber-400"
                        : val.difficulty === "Hard"
                        ? "bg-rose-500"
                        : "hidden"
                    }`}
                  >
                    {val.difficulty}
                  </p>
                </div>
                <div className="w-full whitespace-normal">
                  <p>{val.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default page;
