import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3525;
export const SITE_URL = process.env.SITE_URL || 'https://aitoolpeak.setrox.com.tr';
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const CONTENT_DIR = path.resolve(__dirname, '../../content');
export const ARTICLES_DIR = path.join(CONTENT_DIR, 'articles');
export const CONTACT_SUBMISSIONS_FILE = path.join(CONTENT_DIR, 'contact-submissions', 'submissions.json');

export const CATEGORIES = [
  {
    slug: 'coding-assistants',
    name: 'Coding Assistants',
    description: 'AI-powered coding assistants that help developers write, review, and debug code faster.',
  },
  {
    slug: 'ai-models',
    name: 'AI Models',
    description: 'Deep dives into the latest AI models for coding, reasoning, and content generation.',
  },
  {
    slug: 'devops',
    name: 'DevOps',
    description: 'AI tools and workflows for infrastructure management, monitoring, and deployment.',
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    description: 'AI-powered tools for building modern web applications and websites.',
  },
  {
    slug: 'tools-comparison',
    name: 'Tools Comparison',
    description: 'Side-by-side comparisons of popular AI tools to help you choose the right one.',
  },
] as const;
