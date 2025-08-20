"use client";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex flex-col items-center justify-center text-center px-6">
      {/* Big 404 */}
      <h1 className="text-7xl font-extrabold text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-300 mb-6">
        Oops! Page not found.
      </h2>
      <p className="text-gray-400 max-w-md mb-8">
        The page you’re looking for doesn’t exist or has been moved.  
        But don’t worry, you can head back safely 🚀
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
        <Link
          href="/main/contact"
          className="px-6 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 transition"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
