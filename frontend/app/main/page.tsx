"use client";
import Link from "next/link";
import { Mail, HelpCircle, Trophy, Shield } from "lucide-react";

const MainPage = () => {
  return (
    <section className="w-full min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4">
      <div className="max-w-5xl w-full text-center">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6">
          Welcome to CloneChamp
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 sm:mb-12">
          Your hub for challenges, learning, and competition 🚀
        </p>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Admin */}
          <Link
            href="/main/admin"
            className="p-6 sm:p-8 rounded-2xl bg-white/10 border border-gray-700 shadow-xl hover:scale-105 transition transform flex flex-col items-center"
          >
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-red-400 mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
              Admin
            </h2>
          </Link>

          {/* Contact */}
          <Link
            href="/main/contact"
            className="p-6 sm:p-8 rounded-2xl bg-white/10 border border-gray-700 shadow-xl hover:scale-105 transition transform flex flex-col items-center"
          >
            <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-sky-400 mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
              Contact
            </h2>
          </Link>

          {/* How it Works */}
          <Link
            href="/main/how-it-works"
            className="p-6 sm:p-8 rounded-2xl bg-white/10 border border-gray-700 shadow-xl hover:scale-105 transition transform flex flex-col items-center"
          >
            <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
              How It Works
            </h2>
          </Link>

          {/* Leaderboard */}
          <Link
            href="/main/leaderboard"
            className="p-6 sm:p-8 rounded-2xl bg-white/10 border border-gray-700 shadow-xl hover:scale-105 transition transform flex flex-col items-center"
          >
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
              Leaderboard
            </h2>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
