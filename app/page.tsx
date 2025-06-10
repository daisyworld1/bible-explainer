// app/page.tsx
'use client';

import { JSX, useState } from "react";

export default function App(): JSX.Element {
  const [verse, setVerse] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getExplanation = async (): Promise<void> => {
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
    <div className="min-h-screen bg-[#f5f5f7] text-gray-900 flex items-center justify-center px-6 py-16">
      <div className="card w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold underline">Bible Verse Explainer</h1>
        <p className="text-gray-600 mb-6">Enter a verse and get a clear, concise explanation powered by AI.</p>

        <input
          className="input-primary mb-4"
          type="text"
          placeholder="e.g., John 3:16"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
        />

        <button
          onClick={getExplanation}
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Explaining..." : "Get Explanation"}
        </button>

        {explanation && (
          <div className="mt-6 text-left bg-[#f0f0f3] p-5 rounded-xl text-sm leading-relaxed text-gray-800 shadow-inner">
            {explanation}
          </div>
        )}
      </div>
    </div>
  );
}
