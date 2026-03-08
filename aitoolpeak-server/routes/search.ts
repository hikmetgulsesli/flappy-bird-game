import { Router } from 'express';
import type { Request, Response } from 'express';
import { searchArticles } from '../utils/article-loader.js';

const router = Router();

// GET /api/search?q=query - Search articles
router.get('/', (req: Request, res: Response) => {
  const { q } = req.query;

  if (!q || typeof q !== 'string' || q.trim().length === 0) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Query parameter "q" is required and must be a non-empty string',
      },
    });
    return;
  }

  const results = searchArticles(q.trim());

  res.json({
    data: results,
    meta: {
      query: q.trim(),
      count: results.length,
    },
  });
});

export default router;
