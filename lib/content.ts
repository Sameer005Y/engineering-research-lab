import { connectDB } from "./mongodb";
import Article from "@/models/Article";
import type { Category } from "@/models/Article";

export type ArticleMeta = {
  title: string;
  company: string;
  slug: string;
  description: string;
};

export async function getArticles(category: Category): Promise<ArticleMeta[]> {
  await connectDB();

  const articles = await Article.find({ category })
    .sort({ createdAt: -1 })
    .lean();

  return articles.map((a) => ({
    title: a.title,
    company: a.company,
    slug: a.slug,
    description: a.description,
  }));
}

export async function getArticleBySlug(category: Category, slug: string) {
  await connectDB();
  const article = await Article.findOne({ category, slug }).lean();
  return article;
}