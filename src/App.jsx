// src/App.jsx
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub, FaPinterest, FaTwitter } from "react-icons/fa";
import SendAdvicePage from "./pages/SendAdvicePage.jsx";
import GetAdvicePage from "./pages/GetAdvicePage.jsx";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-gray-100 pt-20">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono hover:font-serif">
          Advice Me Ram :)
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-mono mt-2">
          Choose one option you like to have today
        </p>
      </header>

      <div className="flex space-x-6">
        <button
          onClick={() => navigate("/sendadvice")}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Send Advice
        </button>
        <button
          onClick={() => navigate("/getadvice")}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
        >
          Get Advice
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 overflow-hidden">
        <nav className="w-full bg-blue-600 text-white flex justify-center py-4 space-x-8 fixed top-0 z-50">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-semibold transition duration-200 ${
                isActive ? "text-yellow-300" : "hover:text-blue-200"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/sendadvice"
            className={({ isActive }) =>
              `text-lg font-semibold transition duration-200 ${
                isActive ? "text-yellow-300" : "hover:text-blue-200"
              }`
            }
          >
            Send Advice
          </NavLink>
          <NavLink
            to="/getadvice"
            className={({ isActive }) =>
              `text-lg font-semibold transition duration-200 ${
                isActive ? "text-yellow-300" : "hover:text-blue-200"
              }`
            }
          >
            Get Advice
          </NavLink>
        </nav>

        <div className="flex-grow flex items-center justify-center w-full p-4 pt-20">
    
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sendadvice" element={<SendAdvicePage />} />
            <Route path="/getadvice" element={<GetAdvicePage />} />
          </Routes>
        </div>

        <footer className="w-full py-4 bg-blue-600 text-white flex justify-between items-center px-8">
          <p className="text-sm">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/ramxcodes"
              className="text-yellow-300 hover:text-yellow-400 transition duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ram
            </a>
          </p>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/ramxcodes/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-white hover:text-yellow-300 transition duration-200" size={24} />
            </a>
            <a href="https://github.com/ramxcodes" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-white hover:text-yellow-300 transition duration-200" size={24} />
            </a>
            <a href="https://pinterest.com/reapervox" target="_blank" rel="noopener noreferrer">
              <FaPinterest className="text-white hover:text-yellow-300 transition duration-200" size={24} />
            </a>
            <a href="https://twitter.com/ramxcodes" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-white hover:text-yellow-300 transition duration-200" size={24} />
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}
