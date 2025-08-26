"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/protectedRoute";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebaseConfig";

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

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let admin = user.uid;
        if (admin === process.env.NEXT_PUBLIC_ADMIN) {
          
        } else {
          router.push("/problems");
        }
      }
    });
  }, []);

  const FetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/get-question`
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
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/delete-question/${qNo}`);
      await FetchQuestion();
      router.push("/admin");
      setDeleted(false);
    } catch (error) {
      console.log(error);
      setDeleted(false);
    }
  };
  return (
    <ProtectedRoute>
      <div className="lg:hidden overflow-hidden fixed inset-0 flex items-center justify-center bg-black text-white z-50 p-4 text-center">
        <div className="bg-white/10 border border-white/20 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-sm">
          <h2 className="text-xl font-bold mb-2">
            Desktop Experience Required
          </h2>
          <p className="text-sm text-gray-300">
            CampCode is optimized for larger screens to provide the best
            experience. Please access this platform from a desktop or laptop
            device.
          </p>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <header className="container flex justify-between items-center border-b border-b-gray-600 pb-4">
            <div className="flex flex-col pt-4">
              <h1 className="text-3xl font-bold">Manage Existing Questions</h1>
              <p className="text-gray-400">
                Edit or Delete details for existing Questions
              </p>
            </div>
            <div className="rounded-lg border border-gray-600 px-4 py-2 hover:bg-gray-800 transition">
              <Link href="/admin/form">+ Add New Question</Link>
            </div>
          </header>

          <main className="px-4 py-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {questions.map((val, id) => (
      <div
        key={id}
        className="hover:scale-[1.02] transition-all ease-linear p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col"
      >
        <img
          className="h-60 w-full object-contain mb-2 rounded-lg border border-gray-300 shadow-sm"
          src={val.imageUrl}
          alt="Alternate"
        />

        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {val.qNo}. {val.title || "No title available"}
          </h1>
          <span
            className={`text-xs font-semibold text-white px-2 py-1 rounded ${
              val.difficulty === "easy"
                ? "bg-sky-500"
                : val.difficulty === "medium"
                ? "bg-amber-500"
                : val.difficulty === "hard"
                ? "bg-rose-600"
                : "bg-gray-400"
            }`}
          >
            {val.difficulty?.[0].toUpperCase() + val.difficulty?.slice(1)}
          </span>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{val.description}</p>

        <div className="mt-auto flex justify-between">
          <button
            onClick={() => handleEdit(val.qNo)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Edit
          </button>
          {deleted ? (
            <button className="px-4 py-2 bg-red-400 text-white rounded">Deleting</button>
          ) : (
            <button
              onClick={() => handleDelete(val.qNo)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
</main>

        </div>
      )}
    </ProtectedRoute>
  );
};

export default page;
