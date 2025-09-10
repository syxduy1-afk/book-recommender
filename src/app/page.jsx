"use client";

import { useState } from "react";

export default function BookRecommender() {
  const [mode, setMode] = useState("rule");
  const [name, setName] = useState("Duy");
  const [favoriteGenre, setFavoriteGenre] = useState("Fantasy");
  const [tags, setTags] = useState("magic, adventure");
  const [pages, setPages] = useState(250);
  const [query, setQuery] = useState("fantasy story about friendship and magic");
  const [alpha, setAlpha] = useState(0.5);
  const [result, setResult] = useState(null);

  // Đổi BASE_URL khi bạn deploy backend
  const BASE_URL = "http://127.0.0.1:8000";

  const handleSubmit = async () => {
    let url = "";
    if (mode === "rule") {
      url = `${BASE_URL}/recommend_rule?name=${encodeURIComponent(
        name
      )}&favorite_genre=${encodeURIComponent(
        favoriteGenre
      )}&tags=${encodeURIComponent(tags)}&pages=${pages}`;
    } else if (mode === "embed") {
      url = `${BASE_URL}/recommend_embed?query=${encodeURIComponent(query)}`;
    } else if (mode === "mix") {
      url = `${BASE_URL}/recommend_mix?name=${encodeURIComponent(
        name
      )}&favorite_genre=${encodeURIComponent(
        favoriteGenre
      )}&tags=${encodeURIComponent(tags)}&pages=${pages}&query=${encodeURIComponent(
        query
      )}&alpha=${alpha}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to fetch recommendations" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          📚 Book Recommender
        </h1>

        {/* Mode selector */}
        <div className="mb-4">
          <label className="font-semibold mr-2">Choose Mode:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border rounded p-2"
          >
            <option value="rule">Rule-based</option>
            <option value="embed">Embeddings AI</option>
            <option value="mix">Ensemble (Mix)</option>
          </select>
        </div>

        {/* Input forms */}
        {mode === "rule" && (
          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Your name"
            />
            <input
              type="text"
              value={favoriteGenre}
              onChange={(e) => setFavoriteGenre(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Favorite genre"
            />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Tags (comma separated)"
            />
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Preferred pages"
            />
          </div>
        )}

        {mode === "embed" && (
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
            placeholder="Describe what you want to read..."
          />
        )}

        {mode === "mix" && (
          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Your name"
            />
            <input
              type="text"
              value={favoriteGenre}
              onChange={(e) => setFavoriteGenre(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Favorite genre"
            />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Tags (comma separated)"
            />
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Preferred pages"
            />
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border p-2 rounded"
              rows={3}
              placeholder="Describe what you want to read..."
            />
            <div>
              <label className="mr-2">Alpha (rule weight 0-1):</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={alpha}
                onChange={(e) => setAlpha(parseFloat(e.target.value))}
                className="border p-2 rounded w-20"
              />
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Get Recommendation
        </button>

        {/* Results */}
        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Result:</h2>
            <div className="p-4 bg-gray-50 border rounded-lg">
              {result.book ? (
                <div>
                  <h3 className="text-lg font-bold">{result.book.title}</h3>
                  <p className="text-sm text-gray-700">
                    by {result.book.author} | {result.book.genre} |{" "}
                    {result.book.pages} pages
                  </p>
                  <p className="mt-2 text-gray-800">
                    {result.book.description}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Score: {result.score_final || result.score}
                  </p>
                </div>
              ) : (
                <pre>{JSON.stringify(result, null, 2)}</pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
