"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Loading from "@/app/loading";
import { Check, X } from "lucide-react";

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

const Page = () => {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/get-user-id`,
          { username }
        );

        const u = res.data.user;
        setUser({
          uid: u.uid,
          username: u.username,
          name: u.name || "",
          email: u.email || "",
          bio: u.bio || "",
          avatar:
            u.avatar ||
            `https://ui-avatars.com/api/?name=${
              u.name || "User"
            }&background=1E293B&color=fff`,
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
  }, [username]);

  const startEditing = (field: string, value: string) => {
    setEditField(field);
    setTempValue(value || "");
  };

  const cancelEdit = () => {
    setEditField(null);
    setTempValue("");
  };

  const saveField = () => {
    if (!user || !editField) return;

    const updatedUser = { ...user };
    if (editField.includes(".")) {
      const [parent, child] = editField.split(".");
      (updatedUser as any)[parent][child] = tempValue;
    } else {
      (updatedUser as any)[editField] = tempValue;
    }

    setUser(updatedUser);
    setEditField(null);
    setTempValue("");
    // TODO: send axios PATCH request to backend
  };

  if (!user) return <Loading />;

  const displayValue = (val: string) =>
    val && val.trim() !== "" ? val : "No value written";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Edit Profile</h1>

      <div className="flex items-center gap-8 cursor-pointer p-6 bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-blue-500/70 transition-all duration-500 relative overflow-hidden">
        {/* Gradient glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-400/5 to-blue-600/10 rounded-3xl opacity-60 blur-2xl animate-pulse"></div>

        {/* Avatar */}
        <div className="relative group">
          <div className="p-[4px] rounded-full bg-gradient-to-tr from-blue-400 via-blue-600 to-indigo-500 animate-spin-slow">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-900 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
            />
          </div>

          {/* Glow pulse */}
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-40 blur-2xl group-hover:opacity-70 transition-all duration-500"></div>

          {/* Hover overlay */}
          <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition duration-500">
            <button
              onClick={() => window.open(user.avatar, "_blank")}
              className="px-3 py-1 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow"
            >
              View
            </button>
            <label
              htmlFor="avatarUpload"
              className="px-3 py-1 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white shadow cursor-pointer"
            >
              Change
            </label>
            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  // TODO: handle upload logic here
                  console.log("Selected file:", file);
                }
              }}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-start gap-3">
          <h2 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            {displayValue(user.name)}
          </h2>
        </div>
      </div>

      {["name", "bio","username"].map((field) => (
        <div
          key={field}
          className="p-5 bg-gray-900 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
        >
          <h2 className="text-lg font-semibold mb-3">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </h2>
          {editField === field ? (
            <div className="flex gap-3 items-start">
              {field === "bio" ? (
                <textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  rows={3}
                  className="p-3 rounded-xl bg-gray-800 border border-gray-600 flex-1 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                />
              ) : (
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="p-3 rounded-xl bg-gray-800 border border-gray-600 flex-1 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                />
              )}
              <div className="flex flex-col gap-2">
                <button
                  onClick={saveField}
                  className="px-3 py-1 bg-green-600 rounded-lg hover:bg-green-700 shadow hover:shadow-green-500/50 transition"
                >
                  <Check className="font-extrabold"/>
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 shadow hover:shadow-red-500/50 transition"
                >
                  <X className="font-extrabold"/>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{displayValue((user as any)[field])}</p>
              <button
                onClick={() => startEditing(field, (user as any)[field])}
                className="text-blue-400 hover:underline text-sm"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Socials */}
      <div className="p-5 bg-gray-900 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300 space-y-3">
        <h2 className="text-lg font-semibold mb-2">Socials</h2>
        {["github", "linkedin", "portfolio"].map((key) => (
          <div
            key={key}
            className="flex justify-between items-center gap-3 hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
          >
            <span className="w-28 font-semibold">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </span>
            {editField === `socials.${key}` ? (
              <div className="flex gap-2 flex-1">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="p-2 rounded-xl bg-gray-800 border border-gray-600 flex-1 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                />
                <div className="flex flex-col gap-2">
                  <button
                    onClick={saveField}
                    className="px-3 py-1 bg-green-600 rounded-lg hover:bg-green-700 shadow hover:shadow-green-500/50 transition"
                  >
                    ✔
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 shadow hover:shadow-red-500/50 transition"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center flex-1">
                <p>
                  {displayValue(user.socials[key as keyof typeof user.socials])}
                </p>
                <button
                  onClick={() =>
                    startEditing(
                      `socials.${key}`,
                      user.socials[key as keyof typeof user.socials]
                    )
                  }
                  className="text-blue-400 hover:underline text-sm"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="p-5 bg-gray-900 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300">
        <h2 className="text-lg font-semibold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-700 rounded-full text-sm hover:bg-blue-600 hover:shadow-md transition-all duration-300"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No skills added</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
