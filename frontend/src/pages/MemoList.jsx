import React, { useState, useEffect } from "react";
import LoggedInNavbar from "./LoggedInNavbar";

const MemoList = () => {
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/memos`);
        const data = await response.json();
        setMemos(data); // Store the fetched memos in the state
      } catch (error) {
        console.error("Error fetching memos:", error);
      }
    };

    fetchMemos();
  }, []);

  return (
    <>
      <LoggedInNavbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-300 p-20">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Memos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {memos.map((memo) => (
              <div
                key={memo._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">{memo.title}</h2>
                  <p className="text-gray-600 text-base mb-4">{memo.content}</p>
                  <small className="text-gray-400 text-sm">
                    Created on: {new Date(memo.createdAt).toLocaleString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemoList;
