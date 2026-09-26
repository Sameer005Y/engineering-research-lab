import { Schema, models, model } from "mongoose";

export type Category = "research" | "engineering" | "ai";

export interface IArticle {
  title: string;
  company: string;
  slug: string;
  description: string;
  content: string;
  category: Category;
  createdAt: Date;
}

const ArticleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ["research", "engineering", "ai"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default models.Article || model<IArticle>("Article", ArticleSchema);