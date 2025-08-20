"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "../protectedRoute";
import { Search } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { getAuth } from "firebase/auth"; // make sure Firebase is configured

interface Question {
  qNo: number;
  title: string;
  difficulty: string;
  description: string;
  colors: string;
  imageUrl: string;
  solved?: boolean; // if you ever add solved state per question from API
}

const Page = () => {
  const [selected, setSelected] = useState("all");
  const [SearchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  // Firebase Auth check / user registration
  useEffect(() => {
    const registerUser = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/check-or-create`,
            {
              uid: user.uid,
            }
          );
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    };
    registerUser();
  }, []);

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/get-question`
        );
        const sortedQuestions = response.data.sort(
          (a: Question, b: Question) => a.qNo - b.qNo
        );

        setQuestions(sortedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  //get user
  useEffect(() => {
    const fetchQuestions = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/get-user`,
        { uid: user?.uid }
      );
    };
    fetchQuestions();
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
      {/* Desktop-only overlay */}
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

      {/* Main content for large screens */}
      <div className="lg:block">
        <header className="container flex justify-between items-center border-b border-gray-600 pb-4">
          <div className="flex flex-col pt-4">
            <h1 className="text-3xl font-bold">Challenges</h1>
            <h1 className="text-gray-400">
              Solve frontend challenges to improve your skills
            </h1>
          </div>
          <div className="rounded-lg focus-within:outline-double focus:ring-2 flex justify-center items-center px-2 py-2 gap-4 border border-gray-600">
            <Search className="text-white" />
            <input
              type="text"
              value={SearchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search challenges..."
              className="focus:outline-none bg-gray-950"
            />
          </div>
        </header>

        <header className="container flex items-center gap-5 border-b border-gray-600 py-4">
          <button
            className={
              selected === "all"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-white"
            }
            onClick={() => setSelected("all")}
          >
            All Challenges
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

        <main className="container  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
          {filteredSearch.map((val, id) => (
            <Link
              key={id}
              href={`/problems/${val.title}`}
              className="relative  hover:scale-[1.01] flex flex-col bg-white/5 hover:bg-white/10 border border-gray-700 rounded-xl shadow-md overflow-hidden transition-all duration-300"
            >
             
              <img
                src={val.imageUrl}
                alt="Challenge"
                className="w-full h-52 object-contain bg-gray-900 border-b border-gray-700"
              />
              <div className="flex  flex-col h-full p-4">
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
                    {val.difficulty &&
                      val.difficulty.charAt(0).toUpperCase() +
                        val.difficulty.slice(1)}
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

export default Page;
