export interface ArticleMeta {
  title: string;
  slug: string;
  date: string;
  updated?: string;
  category: string;
  description: string;
  author: string;
  authorImage?: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  ogImage?: string;
}

export interface Article {
  meta: ArticleMeta;
  content: string;
  headings: Heading[];
}

export interface Heading {
  level: number;
  text: string;
  id: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  articleCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}
