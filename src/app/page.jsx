import BookRecommender from "@/components/BookRecommender";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 flex items-center justify-center p-6">
      <BookRecommender />
    </main>
  );
}