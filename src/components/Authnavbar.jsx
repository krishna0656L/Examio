import { Link } from "react-router-dom";

function HeaderNavbar() {
  return (
    <div>
      {/* Navigation Bar */}
      <div className="header container mx-auto flex justify-between items-center py-4 px-6 bg-white shadow-md transition-all duration-500 ease-in-out hover:shadow-lg">
        <div className="App-header">
          <a
            href="/"
            className="text-4xl font-bold text-blue-600 hover:text-gray-600 transition-all duration-500 ease-in-out transform hover:scale-110"
          >
            ExamMate.io
          </a>
        </div>
        <div className="App-nav flex space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 transition-all duration-500 ease-in-out transform hover:translate-y-[-2px] hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="text-gray-600 hover:text-gray-800 transition-all duration-500 ease-in-out transform hover:translate-y-[-2px] hover:scale-105"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderNavbar;