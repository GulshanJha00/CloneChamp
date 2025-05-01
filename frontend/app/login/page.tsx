"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import MainNav from "@/components/Landing/main-nav";
import app from "@/lib/firebaseConfig";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const auth = getAuth(app);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/problems");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleProviderLogin = async (provider: "google" | "github") => {
    const authProvider =
      provider === "google"
        ? new GoogleAuthProvider()
        : new GithubAuthProvider();

    try {
      await signInWithPopup(auth, authProvider);
      router.push("/problems");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <MainNav />
      <div className="min-h-screen flex items-center justify-center  px-4">
        <div className="w-full border-gray-300  border max-w-md rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

          <form onSubmit={handleLogin} className="space-y-4 ">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
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
                className="block text-sm font-medium mb-1"
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
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" className="w-full text-base font-semibold text-white">
              Login
            </Button>
          </form>

          <div className="mt-4 space-y-2">
            <Button
              variant="outline"
              className="w-full bg-white text-black hover:text-white hover:border-white hover:border hover:bg-gray-900"
              onClick={() => handleProviderLogin("google")}
            >
              <i className="fab fa-google mr-2"></i>
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white text-black hover:text-white hover:border-white hover:border hover:bg-gray-900"
              onClick={() => handleProviderLogin("github")}
            >
              <i className="fab fa-github mr-2"></i>
              Continue with GitHub
            </Button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
