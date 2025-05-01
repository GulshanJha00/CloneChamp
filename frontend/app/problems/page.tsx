"use client";
import React from "react";
import ProtectedRoute from "../protectedRoute";
import MainNav from "@/components/Landing/main-nav";
import data from "./problemsData";
import { Search } from "lucide-react";
import { useState } from "react";

const page = () => {
  const [selected, setSelected] = useState("all");

  return (
    <ProtectedRoute>
      <div className="">
        <MainNav />

        <header className="container flex justify-between items-center border-b border-b-gray-600 pb-4">
          <div className=" flex flex-col pt-4 ">
            <h1 className="text-3xl font-bold">Challanges</h1>
            <h1 className="text-gray-400">
              Solve frontend challenges to improve your skills
            </h1>
          </div>
          <div className="rounded-lg flex jusce items-center px-4 py-2 gap-4 border border-gray-600">
            <Search className="text-white " />
            <input
              type="text"
              name=""
              className=" "
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
          {/* {
      id: "1",
      title: "Product Card Component",
      description: "Create a responsive product card with image, title, price, and add to cart button.",
      difficulty: "Easy",
      type: "Official",
      tags: ["HTML", "CSS", "Component"],
      completions: 1245,
      image: "/placeholder.svg?height=200&width=400",
    } */}
          {data.map((val, id) => (
            <div key={id} className="h-max w-max hover:scale-[1.02] transition-all ease-linear p-4 bg-gray-800 rounded-xl">
              <img className="h-60 w-96 py-2 rounded-lg" src={val.image} alt="" />
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">
                  {val.id}. {val.title}
                </h1>
                <p
                  className={`text-xs border rounded-lg px-2 py-1 ${
                    val.difficulty === "Easy"
                      ? "bg-emerald-500"
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
              {/* <p className="text-wrap w-full ">{val.description}</p> */}
            </div>
          ))}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default page;
