import { useEffect, useState } from "react";
import AuthNavbar from "../components/Authnavbar";

function Explore() {
  const [files, setFiles] = useState([]);
  const [subjectname, setSubjectname] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch all files or files by subject
  const fetchAllFiles = async (subject = "") => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${apiUrl}/explore${subject ? `?subjectname=${encodeURIComponent(subject)}` : ""}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await response.json();
      setFiles(data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError(`Failed to fetch files: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
      {/* Uncomment the next line if you want to include the navbar */}
      {/* <AuthNavbar /> */}
      <div className="container mx-auto px-6 py-16 flex-1">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Explore Files
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">
            Discover the links and file paths shared by seniors
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchAllFiles(subjectname);
          }}
          className="max-w-lg mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-300 mb-12"
        >
          <div className="mb-6">
            <label
              htmlFor="subjectname"
              className="block text-lg font-medium text-gray-800 mb-2"
            >
              Subject Name
            </label>
            <input
              type="text"
              id="subjectname"
              className="w-full rounded-lg border-gray-300 focus:border-blue-600 focus:ring-blue-600 p-3"
              placeholder="Enter the subject name"
              value={subjectname}
              onChange={(e) => setSubjectname(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition duration-300 ease-in-out"
          >
            Search
          </button>
        </form>

        {/* Content Section */}
        {loading ? (
          <div className="text-center">
            <p className="text-gray-500 text-lg animate-pulse">Loading files...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 bg-red-50 p-4 rounded-md inline-block">{error}</p>
          </div>
        ) : files.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-200"
              >
                <h1 className="text-xl font-semibold text-gray-800 mb-3 truncate">
                  {file.subject}
                </h1>
                <p className="text-sm text-gray-600 mb-2">
                  Uploaded by: <span className="font-medium">{file.username}</span>
                </p>
                {/* File Paths Section */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-medium mb-1">File Paths:</p>
                  {file.file_paths && file.file_paths.length > 0 ? (
                    file.file_paths.map((path, idx) => (
                      <div key={idx} className="mb-1">
                        <a
                          href={path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 text-sm break-all"
                        >
                          {path}
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No file paths available</p>
                  )}
                </div>
                {/* Main Link Section */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-medium mb-1">Link:</p>
                  {file.links ? (
                    <a
                      href={file.links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 text-sm break-all"
                    >
                      {file.links}
                    </a>
                  ) : (
                    <p className="text-gray-500 text-sm">No link available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 text-lg">No files found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
