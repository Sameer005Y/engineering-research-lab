import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

type ResearchPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getResearchArticle(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "research",
    `${slug}.mdx`,
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");

  const { content, frontmatter } = await compileMDX<{
    title: string;
    company: string;
    slug: string;
    description: string;
  }>({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    content,
    frontmatter,
  };
}

export default async function ResearchArticlePage({
  params,
}: ResearchPageProps) {
  const { slug } = await params;

  const article = await getResearchArticle(slug);

  if (!article) {
    notFound();
  }

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

          <p className="mt-6 text-lg leading-8 text-gray-600">
            {article.frontmatter.description}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-16">
        {article.content}
      </article>
    </main>
  );
}