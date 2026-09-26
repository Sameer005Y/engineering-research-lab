import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getArticles, getArticleSource } from "@/lib/content";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ slug: string }> };
type Frontmatter = { title: string; company: string; slug: string; description: string };

export function generateStaticParams() {
  return getArticles("ai").map((article) => ({ slug: article.slug }));
}

async function loadArticle(slug: string) {
  const source = getArticleSource("ai", slug);
  if (!source) return null;
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: { parseFrontmatter: true },
  });
  return { content, frontmatter };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) return {};
  return {
    title: `${article.frontmatter.title} — Engineering Research Lab`,
    description: article.frontmatter.description,
  };
}

export default async function AIArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) notFound();

  return (
    <main>
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            {article.frontmatter.company}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {article.frontmatter.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">{article.frontmatter.description}</p>
        </div>
      </section>
      <article className="mx-auto max-w-4xl px-6 py-16">{article.content}</article>
    </main>
  );
}