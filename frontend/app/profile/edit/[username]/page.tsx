"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

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
}

const Page = () => {
  const { username } = useParams();
  console.log(username)
  const [user, setUser] = useState<User | null>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

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

  const startEditing = (field: string, value: string) => {
    setEditField(field);
    setTempValue(value);
  };

  const saveField = async () => {
    if (!editField || !formData) return;
    const keys = editField.split(".");
    setFormData((prev) => {
      if (!prev) return prev;
      let updated: any = { ...prev };
      let temp: any = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = tempValue;
      return updated;
    });

    try {
      await axios.patch(`/api/users/${username}`, {
        field: editField,
        value: tempValue,
      });
      console.log(`Updated ${editField} successfully`);
    } catch (err) {
      console.error("Update failed:", err);
    }

    setEditField(null);
  };

  const cancelEdit = () => {
    setEditField(null);
    setTempValue("");
  };

  if (!formData) return <p className="text-white">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>

      {/* Avatar */}
      <div className="flex items-center gap-6 p-4 bg-gray-900 rounded-xl shadow-md">
        <img
          src={formData.avatar}
          alt={formData.user.name}
          className="w-28 h-28 rounded-full border-4 border-gray-700 object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{formData.user.name}</h2>
          <button className="mt-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
            Change Avatar
          </button>
        </div>
      </div>

      {/* Name */}
      <div className="p-4 bg-gray-900 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Name</h2>
        {editField === "user.name" ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="p-2 rounded-lg bg-gray-800 border border-gray-600 flex-1"
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={saveField}
                className="px-3 py-1 bg-green-600 rounded-lg hover:bg-green-700"
              >
                ✔
              </button>
              <button
                onClick={cancelEdit}
                className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700"
              >
                ✖
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{formData.user.name}</p>
            <button
              onClick={() => startEditing("user.name", formData.user.name)}
              className="text-blue-400 hover:underline text-sm"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Bio */}
      <div className="p-4 bg-gray-900 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Bio</h2>
        {editField === "bio" ? (
          <div className="flex gap-2">
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              rows={3}
              className="p-2 rounded-lg bg-gray-800 border border-gray-600 flex-1"
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={saveField}
                className="px-3 py-1 bg-green-600 rounded-lg hover:bg-green-700"
              >
                ✔
              </button>
              <button
                onClick={cancelEdit}
                className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700"
              >
                ✖
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-start">
            <p>{formData.bio}</p>
            <button
              onClick={() => startEditing("bio", formData.bio)}
              className="text-blue-400 hover:underline text-sm"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Socials */}
      <div className="p-4 bg-gray-900 rounded-xl shadow-md space-y-2">
        {["github", "linkedin", "portfolio"].map((key) => (
          <div key={key} className="flex justify-between items-center">
            <a
              href={formData.socials[key as keyof typeof formData.socials]}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline"
            >
              {formData.socials[key as keyof typeof formData.socials]}
            </a>
            <button
              onClick={() =>
                startEditing(
                  `socials.${key}`,
                  formData.socials[key as keyof typeof formData.socials]
                )
              }
              className="text-blue-400 hover:underline text-sm"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="p-4 bg-gray-900 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
