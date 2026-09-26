"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Article = {
  _id: string;
  title: string;
  company: string;
  category: string;
  slug: string;
};

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return;

    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    setArticles((prev) => prev.filter((a) => a._id !== id));
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/new"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            + New Article
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Log out
          </button>
        </div>
      </div>

      {loading ? (
        <p className="mt-10 text-gray-600">Loading...</p>
      ) : (
        <div className="mt-10 grid gap-4">
          {articles.map((article) => (
            <div
              key={article._id}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-6"
            >
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {article.category} · {article.company}
                </p>
                <h2 className="mt-1 text-lg font-semibold">{article.title}</h2>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/admin/${article._id}/edit`}
                  className="text-sm font-medium underline underline-offset-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="text-sm font-medium text-red-600 underline underline-offset-4"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {articles.length === 0 && (
            <p className="text-gray-600">No articles yet.</p>
          )}
        </div>
      )}
    </main>
  );
}