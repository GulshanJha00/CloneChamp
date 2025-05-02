"use client";
import Loading from "@/app/loading";
import ProtectedRoute from "@/app/protectedRoute";
import app from "@/lib/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const page = () => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [verify, setVerify] = useState(false);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let admin = user.uid;
        if (admin === process.env.NEXT_PUBLIC_ADMIN) {
          setVerify(true);
        } else {
          router.push("/");
        }
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    setUploading(true);
    e.preventDefault();
    if (!title || !difficulty || !description || !colors || !image) return toast.error("Please Fill All Details");

    try {
      const formData = new FormData();
      formData.append("file", image);

      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "figMatch"
      );

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = data.secure_url;

      await axios.post("http://localhost:3001/api/upload-question", {
        title,
        difficulty,
        description,
        colors,
        imageUrl,
      });
      setUploading(false);

      toast.success("Questions Uploaded");

      router.push("/admin");
    } catch (err) {
      console.error(err);
      setUploading(false);

      toast.error("Image upload failed.");
    }
  };

  return (
    <ProtectedRoute>
      {verify ? (
        <div className="w-screen h-screen flex justify-center items-center ">
          <div className="bg-gray-900 mx-auto p-6 border-white border max-w-xl rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold mb-4 text-white">
              Upload Question
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              <div>
                <label
                  htmlFor="qNo"
                  className="block mb-1 text-base font-semibold"
                >
                  Question Number
                </label>
                <input
                  type="text"
                  id="qNo"
                  placeholder="Question Number"
                  className="w-full p-2 border text-white rounded "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block mb-1 text-base font-semibold"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className="w-full p-2 border text-white rounded "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="diff"
                  className="block mb-1 text-base font-semibold"
                >
                  Set Difficulty
                </label>
                <select
                  id="diff"
                  className="w-full p-2 border rounded "
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="desc"
                  className="block mb-1 text-base font-semibold"
                >
                  Description
                </label>
                <textarea
                  id="desc"
                  placeholder="Enter Description"
                  className="w-full p-2 border rounded "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="colors"
                  className="block mb-1 text-base font-semibold"
                >
                  Colors
                </label>
                <input
                  type="text"
                  id="colors"
                  placeholder="Colors (#fff, #000)"
                  className="w-full p-2 border rounded "
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block mb-1 text-base font-semibold"
                >
                  Upload Image
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="w-full border border-gray-500 rounded-lg p-3 "
                />
              </div>

              {uploading ? (
                <button
                  type="submit"
                  className="bg-black border border-gray-500 text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
                >
                  Uploading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-black border border-gray-500 text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
                >
                  Upload
                </button>
              )}
            </form>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <Loading />
      )}
    </ProtectedRoute>
  );
};

export default page;
