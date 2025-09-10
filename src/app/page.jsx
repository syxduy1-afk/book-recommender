"use client";

import { useState } from "react";

export default function BookQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    name: "",
    favorite_genre: "",
    tags: "",
    pages: 200,
    query: "",
  });
  const [result, setResult] = useState(null);

  const BASE_URL = "http://127.0.0.1:8000"; // change to your Render URL later

  const questions = [
    { key: "name", text: "What is your name?" },
    { key: "favorite_genre", text: "What is your favorite genre? (Fantasy, Romance, Sci-Fi...)" },
    { key: "tags", text: "What themes or elements do you enjoy? (e.g., magic, friendship, adventure)" },
    { key: "pages", text: "How many pages do you prefer? (approximate number)" },
    { key: "query", text: "Describe in your own words the kind of story you’d love to read." },
    { key: "extra1", text: "Do you prefer modern or classic books?" },
    { key: "extra2", text: "Do you like books in English or another language?" },
    { key: "extra3", text: "Do you like standalone books or series?" },
    { key: "extra4", text: "Do you enjoy character-driven or plot-driven stories?" },
    { key: "extra5", text: "Do you prefer lighthearted or dark themes?" },
  ];

  const handleChange = (e) => {
    setAnswers({ ...answers, [questions[step].key]: e.target.value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    const url = `${BASE_URL}/recommend_mix?name=${encodeURIComponent(
      answers.name
    )}&favorite_genre=${encodeURIComponent(
      answers.favorite_genre
    )}&tags=${encodeURIComponent(
      answers.tags
    )}&pages=${answers.pages}&query=${encodeURIComponent(answers.query)}&alpha=0.5`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to fetch recommendation" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          📚 Book Recommender Quiz
        </h1>

        {!result ? (
          <div>
            <p className="mb-4 font-semibold">
              Question {step + 1} of {questions.length}
            </p>
            <p className="mb-4">{questions[step].text}</p>
            <input
              type="text"
              value={answers[questions[step].key] || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Type your answer..."
            />
            <button
              onClick={handleNext}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {step === questions.length - 1 ? "Get Recommendation" : "Next"}
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Book Recommendation:</h2>
            {result.book ? (
              <div className="p-4 bg-gray-50 border rounded-lg">
                <h3 className="text-lg font-bold">{result.book.title}</h3>
                <p className="text-sm text-gray-700">
                  by {result.book.author} | {result.book.genre} | {result.book.pages} pages
                </p>
                <p className="mt-2 text-gray-800">{result.book.description}</p>
                <p className="mt-2 text-xs text-gray-500">
                  Score: {result.score_final || result.score}
                </p>
              </div>
            ) : (
              <pre>{JSON.stringify(result, null, 2)}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";

export default function BookQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    name: "",
    favorite_genre: "",
    tags: "",
    pages: 200,
    query: "",
  });
  const [result, setResult] = useState(null);

  const BASE_URL = "http://127.0.0.1:8000"; // change to your Render URL later

  const questions = [
    { key: "name", text: "What is your name?" },
    { key: "favorite_genre", text: "What is your favorite genre? (Fantasy, Romance, Sci-Fi...)" },
    { key: "tags", text: "What themes or elements do you enjoy? (e.g., magic, friendship, adventure)" },
    { key: "pages", text: "How many pages do you prefer? (approximate number)" },
    { key: "query", text: "Describe in your own words the kind of story you’d love to read." },
    { key: "extra1", text: "Do you prefer modern or classic books?" },
    { key: "extra2", text: "Do you like books in English or another language?" },
    { key: "extra3", text: "Do you like standalone books or series?" },
    { key: "extra4", text: "Do you enjoy character-driven or plot-driven stories?" },
    { key: "extra5", text: "Do you prefer lighthearted or dark themes?" },
  ];

  const handleChange = (e) => {
    setAnswers({ ...answers, [questions[step].key]: e.target.value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    const url = `${BASE_URL}/recommend_mix?name=${encodeURIComponent(
      answers.name
    )}&favorite_genre=${encodeURIComponent(
      answers.favorite_genre
    )}&tags=${encodeURIComponent(
      answers.tags
    )}&pages=${answers.pages}&query=${encodeURIComponent(answers.query)}&alpha=0.5`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to fetch recommendation" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          📚 Book Recommender Quiz
        </h1>

        {!result ? (
          <div>
            <p className="mb-4 font-semibold">
              Question {step + 1} of {questions.length}
            </p>
            <p className="mb-4">{questions[step].text}</p>
            <input
              type="text"
              value={answers[questions[step].key] || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Type your answer..."
            />
            <button
              onClick={handleNext}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {step === questions.length - 1 ? "Get Recommendation" : "Next"}
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Book Recommendation:</h2>
            {result.book ? (
              <div className="p-4 bg-gray-50 border rounded-lg">
                <h3 className="text-lg font-bold">{result.book.title}</h3>
                <p className="text-sm text-gray-700">
                  by {result.book.author} | {result.book.genre} | {result.book.pages} pages
                </p>
                <p className="mt-2 text-gray-800">{result.book.description}</p>
                <p className="mt-2 text-xs text-gray-500">
                  Score: {result.score_final || result.score}
                </p>
              </div>
            ) : (
              <pre>{JSON.stringify(result, null, 2)}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
