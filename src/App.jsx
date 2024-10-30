/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaTwitter, FaPinterest } from "react-icons/fa";
import html2canvas from "html2canvas";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  const [profileImage, setProfileImage] = useState("");
  const cardRef = useRef(null);

  async function getAdvice() {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip.advice);
      setCount((c) => c + 1);
      await getProfileImage();
    } catch (error) {
      console.error("Failed to fetch advice or profile image:", error);
    }
  }

  async function getProfileImage() {
    try {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      setProfileImage(data.results[0].picture.large);
    } catch (error) {
      console.error("Failed to fetch profile image:", error);
    }
  }

  const captureAndShare = async (platform) => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current);
        const image = canvas.toDataURL("image/png");
        const blob = await (await fetch(image)).blob();
        const file = new File([blob], "capture.png", { type: "image/png" });

        const shareData = {
          files: [file],
          text: "Check out this amazing advice!",
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          const encodedImage = encodeURIComponent(image);
          let url = "";
          if (platform === "linkedin") {
            url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedImage}`;
          } else if (platform === "twitter") {
            url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              advice
            )}`;
          } else if (platform === "pinterest") {
            url = `https://pinterest.com/pin/create/button/?url=${encodedImage}&description=${encodeURIComponent(
              advice
            )}`;
          }
          window.open(url, "_blank");
        }
      } catch (error) {
        console.error("Failed to capture or share:", error);
      }
    }
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center px-4">
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mt-12 font-mono hover:font-serif text-center">
        Advice Me :)
      </h1>
      <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 font-mono text-center">
        Shhh… listen, I&apos;ve got something for you.
      </p>

      <main className="flex-grow flex items-center justify-center w-full">
        <div
          ref={cardRef}
          className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center w-full sm:w-3/4 md:w-1/2 lg:w-1/3 relative"
        >
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            {profileImage && (
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md"
              />
            )}
          </div>

          <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-4 text-gray-800 mt-16 font-mono">
            {advice || "Loading advice..."}
          </h1>
          <button
            className="bg-indigo-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300"
            onClick={getAdvice}
          >
            Get New Advice!
          </button>
          <Message count={count} />

          <div className="flex justify-between items-center mt-4 flex-wrap">
            <div className="flex space-x-4 mb-2 sm:mb-0">
              <button
                className="text-blue-700 hover:text-blue-800"
                onClick={() => captureAndShare("linkedin")}
              >
                <FaLinkedin size={24} />
              </button>
              <button
                className="text-blue-400 hover:text-blue-500"
                onClick={() => captureAndShare("twitter")}
              >
                <FaTwitter size={24} />
              </button>
              <button
                className="text-red-600 hover:text-red-700"
                onClick={() => captureAndShare("pinterest")}
              >
                <FaPinterest size={24} />
              </button>
            </div>

            <div className="text-gray-700 text-sm font-mono mt-2 sm:mt-0">
              Made with ❤️ by{" "}
              <a
                href="https://github.com/ramxcodes"
                className="font-bold text-blue-500 hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ram
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Message({ count }) {
  return (
    <p className="mt-4 text-gray-600">
      You have read <strong>{count}</strong> advices today!
    </p>
  );
}
