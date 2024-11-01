// src/pages/GetAdvicePage.jsx
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaLinkedin, FaTwitter, FaShareAlt } from "react-icons/fa";
import html2canvas from "html2canvas";

export default function GetAdvicePage() {
  const [adviceData, setAdviceData] = useState({ advice: "", author: "" });
  const [count, setCount] = useState(0);
  const adviceRef = useRef(null);

  const fetchAdvice = async () => {
    try {
      const res = await axios.get("https://advice-me-ram-backend.onrender.com/getadvice");
      setAdviceData(res.data); 
      setCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };

  const handleShare = async () => {
    try {
      const element = adviceRef.current;
      const canvas = await html2canvas(element);
      const image = canvas.toDataURL("image/png");

      if (navigator.share) {
        const response = await fetch(image);
        const blob = await response.blob();
        const file = new File([blob], "advice-me-ram.png", {
          type: "image/png",
        });

        await navigator.share({
          files: [file],
          title: "Advice Me Ram",
          text: "Check out this advice!",
        });
      } else {
        alert("Sharing is not supported on this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to share. Try again on a supported device.");
    }
  };


  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText("https://advice-me-ram.vercel.app");
      alert("Share website with your friends the url is copied :)");
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };


  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <header className="text-center mt-8 mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold font-mono hover:font-serif">
          Advice Me Ram :)
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 font-mono">
          Shhh… listen, I&apos;ve got something for you.
        </p>
      </header>

      <div className="flex-grow flex items-center justify-center">
        <div
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center relative"
          ref={adviceRef}
        >
          <p className="text-lg mt-12 mb-2 font-medium text-gray-800">
            {adviceData.advice || "Loading advice..."}
          </p>
          <p className="text-right w-full text-gray-600 italic">
            - {adviceData.author}
          </p>
          <button
            onClick={fetchAdvice}
            className="mt-4 bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
          >
            Get New Advice!
          </button>
          <p className="mt-4 text-gray-600">
            You have read <strong>{count}</strong> pieces of advice today!
          </p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4">
              <button onClick={handleShare}>
                <FaShareAlt
                  className="text-blue-600 hover:text-blue-700"
                  size={20}
                />
              </button>
              <a
                href="https://linkedin.com"
                onClick={handleCopyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  className="text-blue-700 hover:text-blue-800"
                  size={20}
                />
              </a>
              <a
                href="https://twitter.com"
                onClick={handleCopyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter
                  className="text-blue-400 hover:text-blue-500"
                  size={20}
                />
              </a>
            </div>

            <p className="text-gray-500 text-sm">
              Made with ❤️ by{" "}
              <a
                href="https://github.com/ramxcodes"
                className="text-blue-500 hover:text-blue-700"
              >
                Ram
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
