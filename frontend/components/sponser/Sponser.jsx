import Link from "next/link";
import React from "react";

const Sponser = () => {
  return (
    <>
      <header className="p-2 bg-gray-900 border-b border-t border-gray-700 text-center text-white font-semibold tracking-wide">
        Sponsor
      </header>

      <div className="flex  flex-col items-center gap-4 p-6 bg-gray-900 rounded-xl  text-white">
        <p className="text-gray-400 text-sm italic">Powered by</p>


       <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >

        <div className="flex  flex-col items-center gap-2 bg-gray-800 px-6 py-4 rounded-lg  hover:scale-105 transition-transform">

          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            className="w-10 h-10 object-contain"
          />
          <span className="font-semibold text-lg">GitHub</span>
        </div>
        </Link>
      </div>
    </>
  );
};

export default Sponser;
