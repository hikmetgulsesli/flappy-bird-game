import { Router } from 'express';
import type { Request, Response } from 'express';
import { 
  getArticleCache, 
  getArticlesList, 
  getArticleBySlug,
  getArticlesByCategory,
  getFeaturedArticles,
  getRelatedArticles 
} from '../utils/article-loader.js';
import type { ArticleMeta, PaginatedResponse } from '../types.js';

const router = Router();

// GET /api/articles - List articles with filtering and pagination
router.get('/', (req: Request, res: Response) => {
  const { 
    category, 
    tag, 
    featured, 
    page = '1', 
    limit = '9' 
  } = req.query;

  const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10) || 9));

  let articles = getArticlesList();

  // Apply filters
  if (category) {
    articles = articles.filter(a => a.category === category);
  }

  if (tag) {
    articles = articles.filter(a => a.tags.includes(tag as string));
  }

  if (featured === 'true') {
    articles = articles.filter(a => a.featured);
  }

  // Pagination
  const total = articles.length;
  const totalPages = Math.ceil(total / limitNum);
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedArticles = articles.slice(startIndex, startIndex + limitNum);

  const response: PaginatedResponse<ArticleMeta> = {
    data: paginatedArticles,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
    },
  };

  res.json(response);
});

// GET /api/articles/:slug - Get single article with full content
router.get('/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const article = getArticleBySlug(slug);

  if (!article) {
    res.status(404).json({ 
      error: { 
        code: 'NOT_FOUND', 
        message: `Article with slug "${slug}" not found` 
      } 
    });
    return;
  }

  const related = getRelatedArticles(slug, 3);

  res.json({
    article,
    related,
  });
});

export default router;
