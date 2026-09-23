import fs from "fs";
import path from "path";
import Link from "next/link";

type ResearchMetadata = {
  title: string;
  company: string;
  slug: string;
  description: string;
};

function getResearchArticles(): ResearchMetadata[] {
  const researchDirectory = path.join(
    process.cwd(),
    "content",
    "research",
  );

  const files = fs
    .readdirSync(researchDirectory)
    .filter((file) => file.endsWith(".mdx"));

  return files.map((file) => {
    const filePath = path.join(researchDirectory, file);
    const content = fs.readFileSync(filePath, "utf8");

    const frontmatterMatch = content.match(
      /^---\s*([\s\S]*?)\s*---/,
    );

    if (!frontmatterMatch) {
      throw new Error(`Missing frontmatter in ${file}`);
    }

    const frontmatter = frontmatterMatch[1];

    const getValue = (key: string) => {
      const match = frontmatter.match(
        new RegExp(`^${key}:\\s*["']?(.*?)["']?$`, "m"),
      );

      return match?.[1] ?? "";
    };

    return {
      title: getValue("title"),
      company: getValue("company"),
      slug: getValue("slug"),
      description: getValue("description"),
    };
  });
}

export default function ResearchPage() {
  const articles = getResearchArticles();

  return (
    <main>
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Engineering Research
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Research
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Research into how real-world companies solve engineering problems
            at scale.
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
                <p className="text-sm font-medium text-gray-500">
                  {article.company}
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {article.title}
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                  {article.description}
                </p>

                <Link
                  href={`/research/${article.slug}`}
                  className="mt-6 inline-block text-sm font-medium underline underline-offset-4"
                >
                  Read Research →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}