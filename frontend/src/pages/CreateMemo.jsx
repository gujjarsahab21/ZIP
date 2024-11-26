import React, { useState } from "react";
import AdminNavbar from "./adminNavbar";

const CreateMemo = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Function to handle memo creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    const memoData = {
      title,
      content,
      createdBy: "Admin", // Or get this dynamically from session/authentication
    };

    try {
      // Sending POST request to create a memo and trigger email notifications
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/memos/create`, {  // Use dynamic URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memoData),
      });

      if (response.ok) {
        alert("Memo created and emails sent!");
        setTitle("");
        setContent("");
      } else {
        alert("Error creating memo");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating memo");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gradient-to-r from-green-200 to-yellow-300 p-20">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create a New Memo</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                rows="5"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-4 rounded-lg shadow-lg hover:scale-105 transition duration-300"
            >
              Create Memo
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateMemo;
