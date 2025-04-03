import { useState } from "react";
import AuthNavbar from "../components/Authnavbar";
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

      // Assuming the API returns the stored drive link
      const newDriveLink = response.data.driveLink || "";

      setUploadedDriveLinks((prevLinks) =>
        prevLinks ? `${prevLinks}, ${newDriveLink}` : newDriveLink
      );

      // Reset form fields
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col">
      <AuthNavbar />
      <div className="container mx-auto px-6 py-16 flex-1">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Senior Dashboard
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">
            Securely manage and save your subject drive links with ease
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-8 transform transition-all hover:shadow-2xl"
        >
          {error && (
            <p className="text-red-500 bg-red-50 p-3 rounded-md mb-6 text-center font-medium">
              {error}
            </p>
          )}

          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150"
              placeholder="Enter the subject"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="driveLink" className="block text-sm font-semibold text-gray-700 mb-2">
              Google Drive Link
            </label>
            <input
              type="url"
              id="driveLink"
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150"
              placeholder="Enter Google Drive link"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="driveLink" className="block text-sm font-semibold text-gray-700 mb-2">
              Other Link
            </label>
            <input
              type="url"
              id="driveLink"
              value={OtherLink}
              onChange={(e) => setOtherLink(e.target.value)}
              className="w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150"
              placeholder="Other link"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-lg font-medium transition duration-200 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </form>

       
      </div>
    </div>
  );
}

export default Srdashboard;
