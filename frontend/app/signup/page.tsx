"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { app } from "@/lib/firebaseConfig";
import { Button } from "@/components/ui/button";
import MainNav from "@/components/Landing/main-nav";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/problems");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/problems");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGitHubSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/problems");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
        <MainNav/>

    <div className="min-h-screen flex items-center justify-center bg-(--background) px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 border border-[hsl(214.3,31.8%,91.4%)]">
        <h1 className="text-2xl font-bold text-center text-[hsl(222.2,84%,4.9%)] mb-6">
          Create your Account
        </h1>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[hsl(222.2,47.4%,11.2%)] mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-[hsl(214.3,31.8%,91.4%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221.2,83.2%,53.3%)]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[hsl(222.2,47.4%,11.2%)] mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-[hsl(214.3,31.8%,91.4%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221.2,83.2%,53.3%)]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-[hsl(0,84.2%,60.2%)]">{error}</p>
          )}

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        <div className="mt-6 space-y-3">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100"
          >
            <span className="mr-2">🔍</span> Continue with Google
          </Button>

          <Button
            onClick={handleGitHubSignIn}
            className="w-full bg-black text-white hover:bg-gray-900"
          >
            <span className="mr-2">🐱</span> Continue with GitHub
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
    </>
  );
};

export default SignUp;
