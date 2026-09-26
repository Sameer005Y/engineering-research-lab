import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getArticles, getArticleBySlug } from "@/lib/content";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getArticles("research");
  return articles.map((article) => ({ slug: article.slug }));
}

async function loadArticle(slug: string) {
  const article = await getArticleBySlug("research", slug);
  if (!article) return null;

  const { content } = await compileMDX({ source: article.content });

  return { compiledContent: content, meta: article };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) return {};

  return {
    title: `${article.meta.title} — Engineering Research Lab`,
    description: article.meta.description,
  };
}

export default async function ResearchArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) notFound();

  return (
    <main>
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            {article.meta.company}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {article.meta.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">{article.meta.description}</p>
        </div>
      </section>
      <article className="mx-auto max-w-4xl px-6 py-16">{article.compiledContent}</article>
    </main>
  );
}