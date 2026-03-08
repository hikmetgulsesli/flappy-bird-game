import { useParams, Navigate } from 'react-router-dom';
import { useArticle } from '../hooks/useArticle.js';
import { LoadingSpinner } from '../components/ui/LoadingSpinner.js';
import { ArticleContent } from '../components/article/ArticleContent.js';
import { TableOfContents } from '../components/article/TableOfContents.js';
import { AuthorBox } from '../components/article/AuthorBox.js';
import { ShareButtons } from '../components/article/ShareButtons.js';
import { RelatedArticles } from '../components/article/RelatedArticles.js';
import { SEOHead } from '../components/seo/SEOHead.js';
import { Breadcrumbs } from '../components/seo/Breadcrumbs.js';
import { JsonLd } from '../components/seo/JsonLd.js';
import { CATEGORY_LABELS, SITE_CONFIG } from '../lib/constants.js';

export function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading, error } = useArticle(slug || '');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Show 404 for non-existent articles
  if (error === 'Article not found') {
    return <Navigate to="/404" replace />;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[--surface] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Show error state
  if (error || !article) {
    return (
      <div className="min-h-screen bg-[--surface] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Failed to load article</div>
          <p className="text-[--text-secondary] mb-4">{error || 'Article not found'}</p>
          <a
            href="/blog"
            className="inline-block px-4 py-2 bg-[--primary] text-white rounded-lg hover:bg-[--primary-hover] transition-colors cursor-pointer"
          >
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : SITE_CONFIG.url;
  const articleUrl = `${siteUrl}/blog/${article.slug}`;
  const categoryLabel = CATEGORY_LABELS[article.category] || article.category;

  // Article JSON-LD schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.ogImage ? `${siteUrl}${article.ogImage}` : undefined,
    datePublished: article.date,
    dateModified: article.updated || article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: categoryLabel, href: `/blog?category=${article.category}` },
    { label: article.title },
  ];

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.description}
        canonical={`/blog/${article.slug}`}
        ogImage={article.ogImage ? `${siteUrl}${article.ogImage}` : undefined}
        ogType="article"
      />
      <JsonLd schema={articleSchema} />

      <div className="min-h-screen bg-[--surface]">
        {/* Article Header */}
        <header className="bg-[--bg] border-b border-[--border]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} />

            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <a
                href={`/blog?category=${article.category}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[--primary]/10 text-[--primary] hover:bg-[--primary]/20 transition-colors cursor-pointer"
              >
                {categoryLabel}
              </a>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs text-[--text-secondary] bg-[--surface] border border-[--border]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[--text] mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[--text-secondary]">
              <div className="flex items-center gap-2">
                {article.authorImage ? (
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[--primary]/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-[--primary]">
                      {article.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="font-medium text-[--text]">{article.author}</span>
              </div>
              <span>•</span>
              <span>{formatDate(article.date)}</span>
              <span>•</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.ogImage && (
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
            <div className="aspect-[21/9] rounded-xl overflow-hidden bg-[--surface] shadow-lg">
              <img
                src={article.ogImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            {/* Article Content */}
            <div className="max-w-[768px]">
              <ArticleContent html={article.html} />

              {/* Share Buttons */}
              <div className="mt-8 pt-8 border-t border-[--border]">
                <ShareButtons title={article.title} url={articleUrl} />
              </div>

              {/* Author Box */}
              <AuthorBox
                author={article.author}
                authorImage={article.authorImage}
                date={article.date}
              />

              {/* Related Articles */}
              <RelatedArticles articles={article.relatedArticles || []} />
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <TableOfContents headings={article.headings} />
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
