"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({
    title: "",
    company: "",
    slug: "",
    description: "",
    content: "",
    category: "research",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title,
          company: data.company,
          slug: data.slug,
          description: data.description,
          content: data.content,
          category: data.category,
        });
        setLoading(false);
      });
  }, [id]);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
      setSaving(false);
    }
  }

  if (loading) {
    return <main className="mx-auto max-w-3xl px-6 py-20">Loading...</main>;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold tracking-tight">Edit Article</h1>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
          >
            <option value="research">Research</option>
            <option value="engineering">Engineering</option>
            <option value="ai">AI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            rows={2}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content (MDX/Markdown)</label>
          <textarea
            value={form.content}
            onChange={(e) => updateField("content", e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm"
            rows={16}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}