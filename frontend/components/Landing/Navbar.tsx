"use client";
import Link from "next/link";
import { Code } from "lucide-react";
import { Button } from "../ui/button";
import { useAuthStore } from "@/app/store/store";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;
  const [name, setName] = useState("");

  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  useEffect(() => {
  const fetchUser = async () => {
    if (isLoggedIn && user?.uid) {
      const response = await axios.post("http://localhost:3001/auth/get-user", {
        uid: user.uid,
      });
      setName(response.data.name);
    }
  };

  fetchUser();
}, [isLoggedIn, user?.uid]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:px-16 px-2 border-b border-b-gray-600 z-50 flex h-16 items-center sticky top-0 left-0 bg-[hsl(var(--background))]/70 justify-between w-screen gap-6 md:gap-10">
      <nav className=" items-center md:flex gap-6">
        <Link href="/" className="flex items-center gap-2">
          <Code className="h-6 w-6" />
          <span className="font-bold inline-block">CloneChamp</span>
        </Link>
        <div className="hidden md:flex gap-6">
          <Link
            href="/developer/problems"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Problems
          </Link>
          <Link
            href="/designers"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Designer's Section
          </Link>
          <Link
            href="/main/leaderboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Leaderboard
          </Link>
        </div>
      </nav>
      {isLoggedIn ? (
        <div className="flex justify-center items-center gap-5">
          <Button onClick={handleLogout} asChild variant="ghost" size="sm">
            <h1 className="bg-red-500 text-white cursor-pointer hover:bg-red-800">
              Logout
            </h1>
          </Button>
          <div
            onClick={() => router.push(`/profile/${user?.uid}`)}
            className="h-10 w-10 border border-gray-400 hover:border-white cursor-pointer bg-gray-700 flex justify-center items-center rounded-full"
          >
            <h1 className="h-max">{name[0]}</h1>
          </div>
        </div>
      ) : (
        <div className="ml-auto flex space-x-4">
          <Button asChild variant="ghost" size="sm">
            <Link
              className="hover:bg-blue-500 text-blue-500"
              href="/auth/login"
            >
              Login
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link className="text-white hover:bg-blue-700" href="/auth/signup">
              Sign Up
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
