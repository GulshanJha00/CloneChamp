"use client"
import React from "react";

const Page = () => {
  const dummyUser = {
    name: "Gulshan Kumar",
    username: "cool-wolf-x91a2",
    email: "gulshan@example.com",
    bio: "Full-stack dev | MERN + Next.js 🚀 | Dreaming big 💡",
    avatar:
      "https://ui-avatars.com/api/?name=Gulshan+Kumar&background=1E293B&color=fff",
    stats: {
      solved: 128,
      submissions: 450,
      rank: 5321,
    },
  };

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="w-[500px] bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <img
            src={dummyUser.avatar}
            alt={dummyUser.name}
            className="w-20 h-20 rounded-full border-2 border-yellow-400"
          />
          <div>
            <h1 className="text-2xl font-bold">{dummyUser.name}</h1>
            <p className="text-gray-400">@{dummyUser.username}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-gray-300">{dummyUser.bio}</p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-400">{dummyUser.stats.solved}</h2>
            <p className="text-gray-400 text-sm">Problems Solved</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-green-400">{dummyUser.stats.submissions}</h2>
            <p className="text-gray-400 text-sm">Submissions</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-blue-400">#{dummyUser.stats.rank}</h2>
            <p className="text-gray-400 text-sm">Global Rank</p>
          </div>
        </div>

        {/* Email */}
        <div className="mt-6 text-gray-500 text-sm">{dummyUser.email}</div>
      </div>
    </div>
  );
};

export default Page;
