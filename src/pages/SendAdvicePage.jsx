// src/pages/SendAdvicePage.jsx
import { useState } from "react";
import axios from "axios";

export default function SendAdvicePage() {
  const [advice, setAdvice] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("https://advice-me-ram-backend.onrender.com/sendadvice", {
        advice,
        author,
      });
      alert("Advice saved successfully!");
      setAdvice("");
      setAuthor("");
    } catch (error) {
      console.error("Error saving advice:", error);
      alert("Failed to save advice. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <header className="text-center mt-8 mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold font-mono hover:font-serif">
        Share Your Advice
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 font-mono">
        Have a piece of advice that could help others? Share it with the world!
        </p>
      </header>
      <div className="flex-grow flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <textarea
          placeholder="Your advice"
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
          className="w-full h-32 mb-4 p-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
        />
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full mb-4 p-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300"
        >
          Save Advice
        </button>
      </div></div>
    </div>
  );
}
