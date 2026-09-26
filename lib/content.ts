import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ArticleMeta = {
  title: string;
  company: string;
  slug: string;
  description: string;
};

export function getArticles(category: string): ArticleMeta[] {
  const dir = path.join(process.cwd(), "content", category);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return data as ArticleMeta;
    })
    .filter((a) => a.title); // skip empty/broken files instead of crashing
}

  export function getArticleSource(category: string, slug: string) {
    const filePath = path.join(process.cwd(), "content", category, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, "utf8");
  }