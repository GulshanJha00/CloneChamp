"use client";
import Loading from "@/app/loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface User {
  uid: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  skills: string[];
  contact: {
    phone: string;
    email: string;
  };
  socials: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
  solvedQuestions: any[];
}

const Page = ({ params }: PageProps) => {
  const router = useRouter();
  const { id } = React.use(params);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/get-user-id`,
          { username: id }
        );

        const data = res.data;
        const u = data.user;
        setUser({
          uid: u.uid,
          username: u.username,
          name: u.name,
          email: u.email,
          bio: data.bio || "",
          avatar:
            data.avatar ||
            `https://ui-avatars.com/api/?name=${u.name}&background=1E293B&color=fff`,
          skills: u.skills || [],
          contact: u.contact || { phone: "", email: u.email },
          socials: u.socials || { github: "", linkedin: "", portfolio: "" },
          solvedQuestions: u.solvedQuestions || [],
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-950 py-8 px-4 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left Column */}
        <div className="md:w-1/3 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-64px)]">
          {/* Profile Card */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg shadow-black/40 flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-gray-700 object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-50 blur-md animate-pulse"></div>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white text-center">
              {user.name}
            </h1>
            <h2 className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              @{user.username}
            </h2>
            <p className="text-gray-300 text-center text-sm md:text-base">
              {user.bio || "Bio Isn't added yet."}
            </p>

            <button
              onClick={() => router.push(`/profile/edit/${user.username}`)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          </div>
          <div className="flex items-center justify-around  bg-gray-800 rounded-2xl p-6 shadow-lg shadow-black/40 ">
            <div className="flex  flex-col items-center">
              <span className="text-white font-semibold text-lg md:text-xl">
                {user.solvedQuestions?.length || 0}
              </span>
              <span className=" text-sm">Solved</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-white font-semibold text-lg md:text-xl">
                70
              </span>
              <span className="text-white text-sm">Submissions</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-4 md:p-6 shadow-lg shadow-black/40">
            <h1 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-4">
              Skills
            </h1>
            <div className="flex flex-wrap gap-2">
              {user.skills.length > 0 ? (
                user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-700 text-white text-xs md:text-sm px-2 md:px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">No skills added</span>
              )}
            </div>
          </div>
          {/* Contact */}
          <div className="bg-gray-800 rounded-2xl p-4 md:p-6 shadow-lg shadow-black/40">
            <h1 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-4">
              Contact
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Email: {user.contact.email || "N/A"}
            </p>
            <p className="text-gray-300 text-sm md:text-base">
              Phone: {user.contact.phone || "N/A"}
            </p>
            <p className="text-gray-300 text-sm md:text-base">
              GitHub: {user.socials.github || "N/A"}
            </p>
            <p className="text-gray-300 text-sm md:text-base">
              LinkedIn:{" "}
              {user.socials.linkedin || "N/A"} 
            </p>
            <p className="text-gray-300 text-sm md:text-base">
              Portfolio:{" "}
              {user.socials.portfolio || "N/A"}
            </p>

          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-2/3 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-64px)]">
          {/* Solved Questions Placeholder */}
          <div className="bg-gray-800 rounded-2xl p-4 md:p-6 shadow-lg shadow-black/40">
            <h1 className="text-lg md:text-xl font-semibold text-white mb-4">
              Solved Questions
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-700 rounded-lg p-2 md:p-4 flex justify-center items-center text-gray-300 hover:bg-blue-800 transition-colors text-sm md:text-base"
                >
                  Question {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
