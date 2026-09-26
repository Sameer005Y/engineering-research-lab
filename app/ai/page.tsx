import Link from "next/link";
import { getArticles } from "@/lib/content";

export default function AIPage() {
  const articles = getArticles("ai");

  return (
    <main>
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            AI
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            AI
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            LLMs, RAG, agents, evaluations and practical AI engineering.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="rounded-xl border border-gray-200 p-8 transition hover:border-gray-400"
              >
                <p className="text-sm font-medium text-gray-500">{article.company}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">{article.title}</h2>
                <p className="mt-4 max-w-2xl leading-7 text-gray-600">{article.description}</p>
                <Link
                  href={`/ai/${article.slug}`}
                  className="mt-6 inline-block text-sm font-medium underline underline-offset-4"
                >
                  Read →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}