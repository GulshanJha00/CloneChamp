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
import app from "@/lib/firebaseConfig";
import { Button } from "@/components/ui/button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth(app);
  const [signin, setsignin] = useState(false);

  const signInUser = async (uid: string, name: string, email: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/add-user`,
        { uid, name, email }
      );
      console.log(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = result.user;
      await updateProfile(newUser, { displayName: name });
      if (!newUser?.uid || !name || !email) {
        return;
      }
      signInUser(newUser.uid, name, email);

      router.push("/developer/problems");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleProviderLogin = async (provider: "google" | "github") => {
    const selectedProvider =
      provider === "google"
        ? new GoogleAuthProvider()
        : new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, selectedProvider);
      const newUser = result.user;
      if (!newUser?.uid || !newUser.displayName || !newUser.email) {
        return;
      }
      signInUser(newUser?.uid, newUser?.displayName, newUser?.email);
      router.push("/developer/problems");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="min-h-screen  flex items-center justify-center  px-4">
        <div className="w-full max-w-md rounded-xl shadow-xl p-8 border border-[hsl(214.3,31.8%,91.4%)]">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create your Account
          </h1>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md border border-[hsl(214.3,31.8%,91.4%)] focus:outline-none focus:ring-2 focus:ring-[hsl(221.2,83.2%,53.3%)]"
                placeholder="Shyam Kumar"
              />
            </div>
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
                placeholder="ram@example.com"
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

            {error && (
              <p className="text-sm font-medium text-[hsl(0,84.2%,60.2%)]">
                {error}
              </p>
            )}

            {signin ? (
              <Button className="w-full text-base font-semibold text-white">
                Signing in ...
              </Button>
            ) : (
              <Button
                onClick={() => setsignin(true)}
                type="submit"
                className="w-full text-base font-semibold text-white"
              >
                Sign Up
              </Button>
            )}
          </form>

          <div className="mt-6 space-y-3">
            <Button
              onClick={() => handleProviderLogin("google")}
              className="w-full bg-white text-black hover:text-white hover:border-white hover:border hover:bg-gray-900"
            >
              <i className="fab fa-google mr-2"></i>
              Continue with Google
            </Button>

            <Button
              onClick={() => handleProviderLogin("github")}
              className="w-full bg-white text-black hover:text-white hover:border-white hover:border hover:bg-gray-900"
            >
              <i className="fab fa-github mr-2"></i>
              Continue with GitHub
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
