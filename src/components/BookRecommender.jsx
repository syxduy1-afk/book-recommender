"use client";

import React, { useState } from "react";

const QUESTIONS = [
  {
    id: "type",
    label: "Bạn thích tiểu thuyết (fiction) hay phi hư cấu (nonfiction)?",
    options: ["Tiểu thuyết", "Phi hư cấu"],
  },
  {
    id: "pace",
    label: "Bạn thích sách có nhịp nhanh hay chậm, nhiều suy ngẫm?",
    options: ["Nhanh", "Chậm và nhiều suy ngẫm"],
  },
  {
    id: "mood",
    label: "Bạn muốn đọc một cuốn sách vui nhẹ nhàng hay nghiêm túc?",
    options: ["Nhẹ nhàng", "Nghiêm túc"],
  },
  {
    id: "genre",
    label: "Thể loại bạn thích nhất là gì?",
    options: [
      "Giả tưởng (Fantasy)",
      "Khoa học viễn tưởng",
      "Trinh thám / Ly kỳ",
      "Lãng mạn",
      "Tiểu thuyết lịch sử",
      "Tiểu sử",
      "Phát triển bản thân",
      "Không có sở thích cụ thể",
    ],
  },
  {
    id: "length",
    label: "Bạn thích sách ngắn hay dài?",
    options: ["Ngắn (≤ 300 trang)", "Dài (> 300 trang)", "Không quan trọng"],
  },
];

function recommendBook(answers) {
  const { type, genre, mood, pace } = answers;

  if (type === "Phi hư cấu") {
    if (genre === "Tiểu sử")
      return { title: "Steve Jobs — Walter Isaacson", why: "Một cuốn tiểu sử được nghiên cứu sâu, kể chuyện hấp dẫn." };
    if (genre === "Phát triển bản thân")
      return { title: "Atomic Habits — James Clear", why: "Ngắn gọn, dễ áp dụng, đầy đủ hệ thống giúp thay đổi thói quen." };
    return { title: "Sapiens — Yuval Noah Harari", why: "Khám phá lịch sử loài người qua lăng kính khoa học và triết học." };
  }

  if (genre === "Giả tưởng (Fantasy)") {
    if (pace === "Chậm và nhiều suy ngẫm")
      return { title: "The Name of the Wind — Patrick Rothfuss", why: "Một thiên sử thi nhân vật giàu chiều sâu." };
    return { title: "The Hobbit — J.R.R. Tolkien", why: "Cuộc phiêu lưu giả tưởng cổ điển, ngắn gọn và hấp dẫn." };
  }

  if (genre === "Khoa học viễn tưởng")
    return { title: "Dune — Frank Herbert", why: "Thế giới rộng lớn với chính trị, triết học và cuộc phiêu lưu kỳ vĩ." };

  if (genre === "Trinh thám / Ly kỳ") {
    if (mood === "Nhẹ nhàng")
      return { title: "The No. 1 Ladies' Detective Agency — Alexander McCall Smith", why: "Trinh thám nhẹ nhàng, hài hước và dễ thương." };
    return { title: "Gone Girl — Gillian Flynn", why: "Một tiểu thuyết tâm lý giật gân đầy cú twist." };
  }

  if (genre === "Lãng mạn")
    return { title: "Kiêu hãnh và Định kiến — Jane Austen", why: "Tác phẩm kinh điển lãng mạn, sâu sắc và châm biếm xã hội." };

  if (genre === "Tiểu thuyết lịch sử")
    return { title: "All the Light We Cannot See — Anthony Doerr", why: "Một câu chuyện cảm động trong bối cảnh Thế chiến II." };

  if (mood === "Nhẹ nhàng")
    return { title: "Eleanor Oliphant Is Completely Fine — Gail Honeyman", why: "Một câu chuyện ấm áp, vui nhộn nhưng cũng đầy cảm xúc." };

  // fallback
  return { title: "The Catcher in the Rye — J.D. Salinger", why: "Một tác phẩm ngắn, giàu ý nghĩa và được nhiều người yêu thích." };
}

export default function BookRecommender() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  function handleChoose(id, option) {
    const next = { ...answers, [id]: option };
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setResult(recommendBook(next));
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Tìm cuốn sách tiếp theo của bạn 📚</h1>
        <p className="text-sm text-gray-600 mt-1">Trả lời vài câu hỏi ngắn và nhận gợi ý phù hợp.</p>
      </header>

      {!result ? (
        <main>
          <div className="mb-6">
            <div className="text-lg font-semibold text-gray-800">{QUESTIONS[step].label}</div>
            <div className="text-sm text-gray-500 mt-1">Câu hỏi {step + 1} trên {QUESTIONS.length}</div>
          </div>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {QUESTIONS[step].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleChoose(QUESTIONS[step].id, opt)}
                className="rounded-xl border border-gray-200 p-4 text-left hover:shadow-md transition-shadow bg-white"
              >
                <div className="font-medium text-gray-800">{opt}</div>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className="text-sm text-gray-600 hover:underline"
              disabled={step === 0}
            >
              ← Quay lại
            </button>

            <div className="text-sm text-gray-500">Thoải mái trả lời — bạn có thể làm lại từ đầu.</div>
          </div>
        </main>
      ) : (
        <main className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Chúng tôi gợi ý:</h2>
          <p className="mt-3 text-lg text-indigo-700 font-semibold">{result.title}</p>
          <p className="mt-2 text-gray-600">{result.why}</p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={restart}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:opacity-95"
            >
              Làm lại
            </button>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(result.title)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg border border-gray-200 hover:shadow-sm"
            >
              Tìm cuốn sách này
            </a>
          </div>
        </main>
      )}

      <footer className="mt-8 text-xs text-gray-400">
        Được xây dựng bằng Next.js (Client Component: BookRecommender)
      </footer>
    </div>
  );
}