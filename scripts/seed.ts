import { config } from "dotenv";
config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import matter from "gray-matter";

async function main() {
  const { connectDB } = await import("../lib/mongodb");
  const { default: Article } = await import("../models/Article");

  await connectDB();

  const filePath = path.join(
    process.cwd(),
    "content",
    "research",
    "uber-fulfillment-platform.mdx"
  );

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const existing = await Article.findOne({ slug: data.slug });
  if (existing) {
    console.log("⚠️ Article already exists, skipping:", data.slug);
    process.exit(0);
  }

  await Article.create({
    title: data.title,
    company: data.company,
    slug: data.slug,
    description: data.description,
    content,
    category: "research",
  });

  console.log("✅ Seeded article:", data.slug);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});