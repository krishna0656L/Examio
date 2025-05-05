import { useState } from "react";
import HeaderNavbar from "../components/Authnavbar"; // Keep only HeaderNavbar
import { IoDocumentAttach } from "react-icons/io5";

function Jrdashboard() {
  const [seniorname, setSeniorname] = useState("");
  const [subjectname, setSubjectname] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchFiles = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${apiUrl}/Jrdashboard?seniorname=${encodeURIComponent(seniorname)}&subjectname=${encodeURIComponent(subjectname)}`
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch files");
      }
      const data = await response.json();
      setFiles(data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Something went wrong. Please try again.");
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!seniorname.trim() && !subjectname.trim()) {
      setError("Please enter either the senior's name or subject name");
      return;
    }
    setError("");
    fetchFiles();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Flux_Dev_Minimalist_futuristic_digital_background_with_smooth__0.jpg')" }} // Replace with your image path
    >
      <div className="bg-black/60 min-h-screen">
        {/* Keep only HeaderNavbar for Junior Dashboard */}
        <HeaderNavbar />

        <div className="container mx-auto px-4 py-20">
          {/* Form Card */}
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-10">
            <h1 className="text-4xl font-extrabold text-white text-center mb-6">
              Junior Dashboard
            </h1>
            <p className="text-white text-center mb-8">
              Search notes uploaded by your seniors
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">
                  Senior's Username
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-white/70 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. john_doe"
                  value={seniorname}
                  onChange={(e) => setSeniorname(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">
                  Subject Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-white/70 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. Operating Systems"
                  value={subjectname}
                  onChange={(e) => setSubjectname(e.target.value)}
                />
              </div>
              {error && <p className="text-red-400 mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
              >
                Search Notes
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="mt-16 max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-10">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Search Results
            </h2>
            {loading ? (
              <p className="text-white text-center">Loading files...</p>
            ) : files.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-gray-900 shadow-lg"
                  >
                    <h3 className="text-xl font-bold text-blue-800 mb-2">
                      {file.subject}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Uploaded by: <span className="font-semibold">{file.username}</span>
                    </p>

                    <p className="text-sm font-semibold text-gray-800 mt-2">Files:</p>
                    <ul className="space-y-1 mt-1">
                      {file.file_paths && file.file_paths.length > 0 ? (
                        file.file_paths.map((path, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <IoDocumentAttach className="text-xl text-blue-500" />
                            <a
                              href={path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-700 hover:underline"
                            >
                              {path.split("/").pop()}
                            </a>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-600">No file paths available</li>
                      )}
                    </ul>

                    {file.links && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-gray-800">Google Drive Link:</p>
                        <a
                          href={file.links}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:underline break-all"
                        >
                          {file.links}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white text-center">No files found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jrdashboard;
