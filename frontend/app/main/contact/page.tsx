"use client";
import { Mail, Github, Linkedin, Globe, FileText, Twitter } from "lucide-react";
import Link from "next/link";

const Contact = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-gray-800 via-slate-900 to-gray-950 flex items-center justify-center py-16 px-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-extrabold text-white mb-12 text-center">
          Contact Me
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Email */}
          <div className="p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur border border-gray-700 hover:shadow-2xl transition">
            <Mail className="w-8 h-8 text-red-400 mb-3" />
            <p className="text-white font-medium">gulshankumarjha0707@gmail.com</p>
          </div>

          {/* GitHub */}
          <div className="p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur border border-gray-700 hover:shadow-2xl transition">
            <Github className="w-8 h-8 text-gray-200 mb-3" />
            <Link
              href="https://github.com/GulshanJha00"
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              github.com/GulshanJha00
            </Link>
          </div>

          {/* LinkedIn */}
          <div className="p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur border border-gray-700 hover:shadow-2xl transition">
            <Linkedin className="w-8 h-8 text-blue-400 mb-3" />
            <Link
              href="https://www.linkedin.com/in/gulshankumar0/"
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              linkedin.com/in/gulshankumar0
            </Link>
          </div>

          {/* Twitter */}
          <div className="p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur border border-gray-700 hover:shadow-2xl transition">
            <Twitter className="w-8 h-8 text-sky-400 mb-3" />
            <Link
              href="https://x.com/GulshanJha0"
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              x.com/GulshanJha0
            </Link>
          </div>

          {/* Portfolio */}
          <div className="p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur border border-gray-700 hover:shadow-2xl transition">
            <Globe className="w-8 h-8 text-green-400 mb-3" />
            <Link
              href="https://gulshankumar.xyz/"
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              gulshankumar.xyz
            </Link>
          </div>

          {/* Resume */}
          <div className="p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur border border-gray-700 hover:shadow-2xl transition">
            <FileText className="w-8 h-8 text-yellow-400 mb-3" />
            <Link
              href="https://drive.google.com/file/d/11bfoRiiTru3cvCM1dQrPWF16pQ5oquJD/view?usp=sharing"
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              View My Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
