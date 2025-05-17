"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import Footer from "@/components/Landing/footer";
import { toast, ToastContainer } from "react-toastify";

interface Question {
  qNo: number;
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
  const [finalCode, setFinalCode] = useState("");
  const [htmlCode, setHtmlCode] = useState(
    `<body>
      <h1 class="font-bold underline">Your display will be shown here</h1>
      <p>Recreate the target given below</p>
</body>`
  );
  const [cssCode, setCssCode] = useState(
    `p {
      font-style: italic;
      font-weight: 800;
}`
  );
  const [responseData, setResponseData] = useState<Question>(defaultQuestion);
  const [showTarget, setShowTarget] = useState(false);
  const [run, setRun] = useState("Run")

  const params = useParams();
  const { id } = params;
  const title = decodeURIComponent(id as string);

  const getImage = async () => {
    const response = await axios.post(`http://localhost:3001/api/get-target`, {
      title,
    });
    if (response.data && response.data.length > 0) {
      setResponseData(response.data[0]);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  useEffect(() => {
    setFinalCode(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          ${cssCode}
        </style>
      </head>
      ${htmlCode}
    </html>
    `);
  }, [htmlCode, cssCode]);

  const handleRun = async () => {
    setRun("Running..")
    if (!finalCode || !responseData.imageUrl) {
      toast.error("No code written");
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/get-solution",
        {
          finalCode,
          target: responseData.imageUrl,
        }
      );
      if (response.data.percentageMatch > 95) {
        toast.success(
          <div className="w-full bg-black text-white shadow-sm text-sm font-medium">
            Match Score: {parseFloat(response.data.percentageMatch).toFixed(2)}%.  
            <br />
            <span className="text-green-400">Submission accepted. Omedeto!!</span>
          </div>,
          {
            style: {
              background: 'black',
              border: '1px solid white',
              color: 'white',
            },
          }
        );
      } else {
        toast.error(
          <div className="w-full bg-black text-white shadow-sm text-sm font-medium">
            Match Score: {parseFloat(response.data.percentageMatch).toFixed(2)}%.  
            <br />
            <span className="text-red-400">Your solution is less than 95%. Please try again.</span>
          </div>,
          {
            style: {
              background: 'black',
              border: '1px solid white',
              color: 'white',
            },
          }
        );
      }
      
    } catch (error) {}
    finally{
      setRun("Run")
    }
  };
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
              value={htmlCode}
              onChange={(value) => setHtmlCode(value || "")}
              options={{
                fontSize: 13,
                fontFamily: "'Source Code Pro', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: true,
                wordWrap: "on",
              }}
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
              value={cssCode}
              onChange={(value) => setCssCode(value || "")}
              options={{
                fontSize: 13,
                fontFamily: "'Source Code Pro', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: true,
                wordWrap: "on",
              }}
              className="w-full h-[calc(100%+3px)]"
            />
          </div>
        </div>

        <div className="w-1/2 h-full flex flex-col border-r bg-gray-900 border-gray-800 overflow-y-auto">
          <div className="h-1/2 relative mb-2 w-full">
            <header className="p-1 z-10 flex justify-between items-center px-10 bg-gray-900 border-b border-gray-700 shadow-md">
              <span className="text-base font-semibold text-white">
                Output Window
              </span>
            </header>

            <div className="h-full w-full flex justify-center items-center">
              <div className="h-80 w-80 bg-gray-600 m-4 rounded-lg border border-gray-700 overflow-hidden shadow-xl relative">
                {showTarget && responseData.imageUrl ? (
                  <img
                    src={responseData.imageUrl}
                    alt="Target"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <iframe
                    srcDoc={finalCode}
                    title="Live Preview"
                    sandbox="allow-scripts allow-same-origin"
                    frameBorder="0"
                    className="w-full h-full rounded-lg relative z-10"
                  />
                )}
              </div>
              <div className="p-2  h-full z-10 text-center flex justify-center flex-col gap-5">
                <button
                  onClick={() => setShowTarget(false)}
                  className={showTarget? "px-5 py-2 rounded-md text-black bg-yellow-400 hover:bg-yellow-300 font-semibold" :  "px-5 py-2 rounded-md text-black bg-yellow-500 font-semibold"}
                >
                  Live Preview
                </button>
                <button
                  onClick={() => setShowTarget(true)}
                  className={showTarget?"px-5 py-2 rounded-md text-black bg-yellow-600 font-semibold" : "px-5 py-2 rounded-md text-black bg-yellow-400 hover:bg-yellow-300 font-semibold" }
                >
                  Question
                </button>
                <button
                  onClick={handleRun}
                  className="px-5 py-2 rounded-md text-black bg-sky-500 hover:bg-sky-400 font-semibold"
                >
                  {`${run}`}
                </button>
                <button className="px-5 py-2 rounded-md text-black bg-purple-500 hover:bg-purple-400 font-semibold">
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="h-1/2 w-full bg-gray-900 shadow-lg">
            <header className="p-1 bg-gray-900 ">
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

                {/* Content Section */}
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
                    <span className="text-gray-400">
                      Click a color to copy:
                    </span>
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

          <ToastContainer />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;

interface ColorBoxProps {
  color: string;
}

const ColorBox = ({ color }: ColorBoxProps) => {
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
