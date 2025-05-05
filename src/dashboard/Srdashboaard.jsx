import { useState } from "react";
import HeaderNavbar from "../components/Authnavbar";
import axios from "axios";

function Srdashboard() {
  const [driveLink, setDriveLink] = useState("");
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [uploadedDriveLinks, setUploadedDriveLinks] = useState("");
  const [OtherLink, setOtherLink] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password || !subject || !driveLink) {
      setError("Please fill all fields and provide a drive link");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/SrDashboard`, {
        username,
        password,
        subject,
        driveLink,
        OtherLink,
      });

      console.log("Success:", response.data);
      setError("");

      const newDriveLink = response.data.driveLink || "";
      setUploadedDriveLinks((prevLinks) =>
        prevLinks ? `${prevLinks}, ${newDriveLink}` : newDriveLink
      );

      setDriveLink("");
      setSubject("");
      setPassword("");
      setUsername("");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError("Drive link upload failed. Please try again.");
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Flux_Dev_Minimalist_futuristic_digital_background_with_smooth__0.jpg')" }} // replace with your image path
    >
      <div className="bg-black/60 min-h-screen">
        <HeaderNavbar />
        <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center">

          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Senior Dashboard
            </h1>
            <p className="mt-3 text-lg text-white/80 max-w-md mx-auto">
              Securely manage and save your subject drive links with ease
            </p>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-10 text-white"
          >
            {error && (
              <p className="text-red-400 bg-red-100/20 p-3 rounded-md mb-6 text-center font-medium">
                {error}
              </p>
            )}

            <div className="mb-6">
              <label htmlFor="username" className="block font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white/70 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white/70 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3"
                placeholder="Enter your password"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white/70 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3"
                placeholder="Enter the subject"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="driveLink" className="block font-semibold mb-2">
                Google Drive Link
              </label>
              <input
                type="url"
                id="driveLink"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white/70 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3"
                placeholder="Enter Google Drive link"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="otherLink" className="block font-semibold mb-2">
                Other Link (optional)
              </label>
              <input
                type="url"
                id="otherLink"
                value={OtherLink}
                onChange={(e) => setOtherLink(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white/70 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3"
                placeholder="Other resource link"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition duration-200 transform hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Srdashboard;
