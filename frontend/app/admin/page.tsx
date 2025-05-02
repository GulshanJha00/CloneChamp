"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";

interface Question {
  qNo: number;
  title: string;
  difficulty: string;
  description: string;
  colors: string;
  imageUrl: string;
}
const page = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const FetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3001/api/get-question"
      );
      console.log(response.data);
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    FetchQuestion();
  }, []);

  const handleEdit = (qNo: number) => {
    console.log(qNo);
  };

  const handleDelete = async (qNo: number) => {
    setDeleted(true);
    try {
      await axios.delete(`http://localhost:3001/api/delete-question/${qNo}`);
      await FetchQuestion();
      router.push("/admin");
      setDeleted(false);
    } catch (error) {
      console.log(error);
      setDeleted(false);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <header className="container flex justify-between items-center border-b border-b-gray-600 pb-4">
            <div className="flex flex-col pt-4">
              <h1 className="text-3xl font-bold">Manage Existing Questions</h1>
              <p className="text-gray-400">
                Edit or Delete details for existing questions
              </p>
            </div>
            <div className="rounded-lg border border-gray-600 px-4 py-2 hover:bg-gray-800 transition">
              <Link href="/admin/form">+ Add New Question</Link>
            </div>
          </header>

          <main className="container grid grid-cols-3 py-10 gap-10">
            {questions.map((val, id) => (
              <div
                key={id}
                className="h-full w-full hover:scale-[1.02] transition-all ease-linear p-4 bg-gray-800 rounded-xl"
              >
                <img
                  className="h-80 w-96 p-2 mb-2 rounded-lg bg-contain hover:scale-[0.98] transition-all duration-300 ease-in-out transform border border-gray-500 shadow-lg"
                  src={val.imageUrl}
                  alt="Alternate"
                />
                <div className="flex justify-between mb-4  items-center">
                  <h1 className="text-xl font-bold">
                    {val.qNo}. {val.title || "No title available"}
                  </h1>
                  <p
                    className={`text-xs border rounded-lg px-2 py-1 ${
                      val.difficulty === "easy"
                        ? "bg-sky-500"
                        : val.difficulty === "medium"
                        ? "bg-amber-400"
                        : val.difficulty === "hard"
                        ? "bg-rose-500"
                        : "hidden"
                    }`}
                  >
                    {val.difficulty[0].toUpperCase() + val.difficulty.slice(1)}
                  </p>
                </div>
                <div className="w-full whitespace-normal mb-2">
                  <p>{val.description}</p>
                </div>
                <div className="flex justify-around items-center z-50">
                  <button
                    onClick={() => handleEdit(val.qNo)}
                    className="px-4 py-2 hover:bg-blue-900 bg-blue-700 rounded-lg"
                  >
                    Edit
                  </button>
                  {deleted ? (
                    <button className="px-4 py-2 bg-red-800 rounded-lg">
                      Deleting
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDelete(val.qNo)}
                      className="px-4 py-2 hover:bg-red-800 bg-red-700 rounded-lg"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </main>
        </div>
      )}
    </>
  );
};

export default page;
