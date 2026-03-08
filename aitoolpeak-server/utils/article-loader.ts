import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import type { Article, ArticleMeta } from '../types.js';
import { renderMarkdown } from './markdown.js';
import { ARTICLES_DIR } from '../config.js';

// Article cache: Map<slug, Article>
const articleCache = new Map<string, Article>();

// Index for search and filtering
let articlesList: ArticleMeta[] = [];

export function getArticleCache(): Map<string, Article> {
  return articleCache;
}

export function getArticlesList(): ArticleMeta[] {
  return articlesList;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articleCache.get(slug);
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return articlesList.filter(article => article.category === category);
}

export function getFeaturedArticles(): ArticleMeta[] {
  return articlesList.filter(article => article.featured);
}

export function getArticlesByTag(tag: string): ArticleMeta[] {
  return articlesList.filter(article => article.tags.includes(tag));
}

export function searchArticles(query: string): ArticleMeta[] {
  const lowerQuery = query.toLowerCase();
  return articlesList.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedArticles(slug: string, limit: number = 3): ArticleMeta[] {
  const article = articleCache.get(slug);
  if (!article) return [];

  const { category, tags } = article.meta;
  
  // Score articles by category match and tag overlap
  const scored = articlesList
    .filter(a => a.slug !== slug)
    .map(a => {
      let score = 0;
      if (a.category === category) score += 2;
      const tagOverlap = a.tags.filter(tag => tags.includes(tag)).length;
      score += tagOverlap;
      return { article: a, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(s => s.article);
}

export async function loadArticles(): Promise<void> {
  console.log('[ArticleLoader] Loading articles from:', ARTICLES_DIR);
  
  try {
    // Clear existing cache
    articleCache.clear();
    articlesList = [];

    // Ensure articles directory exists
    try {
      await fs.access(ARTICLES_DIR);
    } catch {
      console.log('[ArticleLoader] Articles directory does not exist, creating...');
      await fs.mkdir(ARTICLES_DIR, { recursive: true });
      console.log('[ArticleLoader] No articles to load (directory was empty)');
      return;
    }

    // Read all markdown files
    const files = await fs.readdir(ARTICLES_DIR);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    console.log(`[ArticleLoader] Found ${mdFiles.length} markdown files`);

    for (const file of mdFiles) {
      try {
        const filePath = path.join(ARTICLES_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Parse frontmatter
        const { data, content: markdownContent } = matter(content);
        
        // Validate required fields
        const requiredFields = ['title', 'slug', 'date', 'category', 'description', 'author', 'tags', 'readTime'];
        const missingFields = requiredFields.filter(f => !(f in data));
        
        if (missingFields.length > 0) {
          console.warn(`[ArticleLoader] Skipping ${file}: missing fields [${missingFields.join(', ')}]`);
          continue;
        }

        // Render markdown to HTML
        const { html, headings } = renderMarkdown(markdownContent);

        // Build ArticleMeta
        const meta: ArticleMeta = {
          title: data.title,
          slug: data.slug,
          date: data.date,
          updated: data.updated,
          category: data.category,
          description: data.description,
          author: data.author,
          authorImage: data.authorImage,
          tags: Array.isArray(data.tags) ? data.tags : [],
          readTime: data.readTime,
          featured: Boolean(data.featured),
          ogImage: data.ogImage,
        };

        const article: Article = {
          meta,
          content: html,
          headings,
        };

        // Add to cache
        articleCache.set(meta.slug, article);
        articlesList.push(meta);

        console.log(`[ArticleLoader] Loaded: ${meta.title} (${meta.slug})`);
      } catch (error) {
        console.error(`[ArticleLoader] Error loading ${file}:`, error);
      }
    }

    // Sort articles by date (newest first)
    articlesList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log(`[ArticleLoader] Successfully loaded ${articleCache.size} articles`);
  } catch (error) {
    console.error('[ArticleLoader] Fatal error loading articles:', error);
    throw error;
  }
}
