import { Router } from 'express';
import type { Request, Response } from 'express';
import { getArticlesList } from '../utils/article-loader.js';
import { SITE_URL } from '../config.js';

const router = Router();

// GET /sitemap.xml - Generate dynamic sitemap
router.get('/', (_req: Request, res: Response) => {
  const articles = getArticlesList();
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/categories', priority: '0.8', changefreq: 'weekly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.4', changefreq: 'yearly' },
    { url: '/terms', priority: '0.4', changefreq: 'yearly' },
    { url: '/disclaimer', priority: '0.4', changefreq: 'yearly' },
  ];

  // Category pages
  const categories = ['coding-assistants', 'ai-models', 'devops', 'web-development', 'tools-comparison'];
  const categoryPages = categories.map(cat => ({
    url: `/category/${cat}`,
    priority: '0.7',
    changefreq: 'weekly',
  }));

  // Article pages
  const articlePages = articles.map(article => ({
    url: `/blog/${article.slug}`,
    priority: article.featured ? '0.8' : '0.6',
    changefreq: 'monthly',
    lastmod: article.updated || article.date,
  }));

  const allUrls = [...staticPages, ...categoryPages, ...articlePages];

  const sitemap = `\u003c?xml version="1.0" encoding="UTF-8"?\u003e
\u003curlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\u003e
${allUrls.map(page => `  \u003curl\u003e
    \u003cloc\u003e${SITE_URL}${page.url}\u003c/loc\u003e
    \u003cpriority\u003e${page.priority}\u003c/priority\u003e
    \u003cchangefreq\u003e${page.changefreq}\u003c/changefreq\u003e${page.lastmod ? `\n    \u003clastmod\u003e${page.lastmod}\u003c/lastmod\u003e` : ''}
  \u003c/url\u003e`).join('\n')}
\u003c/urlset\u003e`;

  res.setHeader('Content-Type', 'application/xml');
  res.send(sitemap);
});

export default router;
