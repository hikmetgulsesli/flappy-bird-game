import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT, NODE_ENV } from './config.js';
import { loadArticles } from './utils/article-loader.js';
import articlesRouter from './routes/articles.js';
import categoriesRouter from './routes/categories.js';
import searchRouter from './routes/search.js';
import contactRouter from './routes/contact.js';
import sitemapRouter from './routes/sitemap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());

// Request logging in development
if (NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// API Routes
app.use('/api/articles', articlesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/search', searchRouter);
app.use('/api/contact', contactRouter);
app.use('/sitemap.xml', sitemapRouter);

// Serve static files in production
if (NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, '../dist');
  app.use(express.static(distPath, {
    maxAge: '1y',
    immutable: true,
  }));

  // SPA catch-all
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Resource not found' } });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Server Error]', err);
  res.status(500).json({ 
    error: { 
      code: 'INTERNAL_ERROR', 
      message: NODE_ENV === 'production' ? 'Internal server error' : err.message 
    } 
  });
});

// Load articles and start server
async function startServer() {
  try {
    await loadArticles();
    
    app.listen(PORT, () => {
      console.log(`[Server] Running on port ${PORT}`);
      console.log(`[Server] Environment: ${NODE_ENV}`);
      console.log(`[Server] Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('[Server] Failed to start:', error);
    process.exit(1);
  }
}

startServer();
