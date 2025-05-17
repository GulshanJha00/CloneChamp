import Link from "next/link";
import { Code } from "lucide-react";
import { Button } from "../ui/button";
import { useAuthStore } from "@/app/store/store";
import { getAuth, signOut } from "firebase/auth";

export default function MainNav() {
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-16 border-b border-b-gray-600 z-50 flex h-16 items-center sticky top-0 left-0 bg-[hsl(var(--background))]/70 justify-between w-screen gap-6 md:gap-10">
      <nav className="hidden items-center md:flex gap-6">
        <Link href="/" className="flex items-center gap-2">
          <Code className="h-6 w-6" />
          <span className="font-bold inline-block">CampCode</span>
        </Link>
        <div className="hidden md:flex gap-6">
          <Link href="/problems" className="text-sm font-medium transition-colors hover:text-primary">
            Problems
          </Link>
          <Link href="/designers" className="text-sm font-medium transition-colors hover:text-primary">
            Designer's Section
          </Link>
          <Link href="/leaderboard" className="text-sm font-medium transition-colors hover:text-primary">
            Leaderboard
          </Link>
          <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
            Pricing
          </Link>
        </div>
      </nav>
      {isLoggedIn ? (
        <Button onClick={handleLogout} asChild variant="ghost" size="sm">
          <h1 className="bg-red-500 text-white cursor-pointer hover:bg-red-800">Logout</h1>
        </Button>
      ) : (
        <div className="ml-auto flex space-x-4">
          <Button asChild variant="ghost" size="sm">
            <Link className="hover:bg-blue-500 text-blue-500" href="/login">
              Login
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link className="text-white hover:bg-blue-700" href="/signup">
              Sign Up
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
