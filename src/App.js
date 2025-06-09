import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [verse, setVerse] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const getExplanation = async () => {
    if (!verse.trim()) return;
    setLoading(true);
    setExplanation("Loading...");
  
    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verse }),
      });
  
      const data = await response.json();
      setExplanation(data.explanation || data.error);
    } catch (error) {
      console.error(error);
      setExplanation("Something went wrong.");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Bible Verse Explainer</h1>
        <input
          className="w-full p-3 border rounded mb-4"
          type="text"
          placeholder="e.g., John 3:16"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
        />
        <button
          onClick={getExplanation}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Explaining..." : "Explain"}
        </button>
        {explanation && (
          <div className="mt-4 whitespace-pre-wrap text-gray-700">
            {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
