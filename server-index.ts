import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadArticles } from './utils/article-loader.js';
import { articlesRouter } from './routes/articles.js';
import { categoriesRouter } from './routes/categories.js';
import { searchRouter } from './routes/search.js';
import { contactRouter } from './routes/contact.js';
import { sitemapRouter } from './routes/sitemap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3525;
const SITE_URL = process.env.SITE_URL || 'https://aitoolpeak.setrox.com.tr';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load articles at startup
await loadArticles();

// API Routes
app.use('/api/articles', articlesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/search', searchRouter);
app.use('/api/contact', contactRouter);
app.use('/sitemap.xml', sitemapRouter);

// Static files
app.use('/assets', express.static(path.join(__dirname, '../dist/assets'), { maxAge: '1y' }));
app.use(express.static(path.join(__dirname, '../dist')));

// SPA catch-all - must be after API routes and static files
app.get(/.*/, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: unknown) => {
  console.error('Error:', err);
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An internal error occurred'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Site URL: ${SITE_URL}`);
});

export { app, SITE_URL };
