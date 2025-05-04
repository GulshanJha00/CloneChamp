"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import Footer from "@/components/Landing/footer";

interface Question {
  qNo:number,
  title: string;
  difficulty: string;
  description: string;
  colors: string;
  imageUrl: string;
}
const defaultQuestion: Question = {
  qNo: 0,
  title: "",
  description: "",
  difficulty: "",
  colors: "",
  imageUrl: "",
};
const Page = () => {
  const [editor, setEditor] = useState("html");
  const [responseData, setResponseData] = useState<Question>(defaultQuestion);
  const params = useParams();
  const { id } = params;
  const title = decodeURIComponent(id as string);

  const getIMage = async () => {
    const response = await axios.post(`http://localhost:3001/api/get-target`, {
      title,
    });
    if (response.data && response.data.length > 0) {
    setResponseData(response.data[0]);
  }
  };

  useEffect(() => {
    getIMage();
  }, []);

  return (
    <>
    
    <div className="flex h-screen w-full text-white bg-[#0e0e0e]">
      {/* Left Panel */}
      <div className="w-1/2 h-full flex flex-col border-r border-gray-800">
        {/* HTML Editor */}
        <div className="h-1/2 ">
          <header className="p-1 bg-gray-900 border-b border-gray-700">
            <span className="text-sm font-semibold">HTML</span>
          </header>
          <Editor
            defaultLanguage="html"
            theme="vs-dark"
            options={{
              fontSize: 13,
              fontFamily: "'Source Code Pro', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: true,
              wordWrap: "on",
            }}
            defaultValue={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <h1>Your display will be shown here</h1>
    <p>Recreate the target given below</p>
</body>
</html>`}
            className="w-full h-full"
          />
        </div>

        {/* CSS Editor */}
        <div className="h-[calc(50%-30px)] z-20">
          <header className="p-1 bg-gray-800 border-b border-gray-700 text-white text-sm font-semibold">
            CSS
          </header>
          <Editor
            language="css"
            theme="vs-dark"
            options={{
              fontSize: 13,
              fontFamily: "'Source Code Pro', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: true,
              wordWrap: "on",
            }}
          
            defaultValue={`body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* Write your CSS code here */
`}
            className="w-full h-[calc(100%+3px)]"
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 h-full flex flex-col border-r border-gray-800 overflow-y-auto">
        {/* Output Window */}
        <div className="h-1/2 mb-16 w-full">
          <header className="p-1 bg-gray-900 border-b border-gray-700">
            <span className="text-sm font-semibold">Output Window</span>
          </header>
          <div className="h-80 w-80 bg-green-500 m-4 rounded-lg border border-gray-700" />
        </div>

        {/* Target Info */}
        <div className="h-1/2 w-full   bg-gray-800  shadow-lg">
          <header className="p-1 bg-gray-900 border-b border-gray-700 ">
            <span className="text-lg font-semibold text-yellow-400">
              Recreate this target
            </span>
          </header>

          <div className="p-4 text-sm space-y-4">
            <div className="flex gap-6">
              {/* Image Section */}
              <div className="flex-shrink-0">
                <img
                  src={responseData.imageUrl}
                  alt={responseData.title}
                  className="w-56 h-56 object-contain border-4 border-gray-700 rounded-lg shadow-lg hover:scale-105 transition-transform"
                />
              </div>

              {/* Content Section - Fill up space */}
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h2 className="text-2xl font-bold text-yellow-400">
                    {responseData.title}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {responseData.description || "No description available."}
                  </p>

                  {/* Difficulty Badge */}
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-gray-400">Difficulty:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        responseData.difficulty === "hard"
                          ? "bg-red-700 text-white"
                          : responseData.difficulty === "medium"
                          ? "bg-yellow-700 text-white"
                          : "bg-green-700 text-white"
                      }`}
                    >
                      {responseData.difficulty}
                    </span>
                  </div>
                </div>

                {/* Colors Section */}
                <div className="mt-6">
                  <span className="text-gray-400">Click a color to copy:</span>
                  <div className="flex gap-3 mt-2 flex-wrap">
                    {responseData.colors?.split(",").map((color, index) => (
                      <ColorBox key={index} color={color.trim()} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Empty State Message */}
            {!responseData.imageUrl && (
              <div className="mt-10 text-gray-500 text-sm text-center italic">
                No target preview available. Check the data source or refresh
                the page.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
      <Footer/>
    </>
  );
};

export default Page;


interface ColorBoxProps {
  color: string;
}

const ColorBox = ({ color }:ColorBoxProps) => {
  const [copied, setCopied] = useState(false);

  const copyColor = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div
      className="p-2 bg-gray-800 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-gray-700 transition"
      onClick={copyColor}
      title="Click to copy"
    >
      <div
        className="w-6 h-6 rounded border border-white"
        style={{ backgroundColor: color }}
      />
      <span className="text-white text-xs">{copied ? "Copied!" : color}</span>
    </div>
  );
};

