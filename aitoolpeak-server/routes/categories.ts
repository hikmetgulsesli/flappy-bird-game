import { Router } from 'express';
import type { Request, Response } from 'express';
import { getArticlesList } from '../utils/article-loader.js';
import { CATEGORIES } from '../config.js';
import type { Category } from '../types.js';

const router = Router();

// GET /api/categories - List all categories with article counts
router.get('/', (_req: Request, res: Response) => {
  const articles = getArticlesList();
  
  const categories: Category[] = CATEGORIES.map(cat => ({
    ...cat,
    articleCount: articles.filter(a => a.category === cat.slug).length,
  }));

  res.json({ data: categories });
});

export default router;
