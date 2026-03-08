import type { ArticleMeta } from '../../lib/types.js';

interface RelatedArticlesProps {
  articles: ArticleMeta[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section className="mt-16 pt-12 border-t border-[--border]">
      <h2 className="text-2xl font-bold text-[--text] mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="group bg-[--bg] rounded-xl border border-[--border] overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          >
            <a href={`/blog/${article.slug}`} className="block">
              {article.ogImage && (
                <div className="aspect-video overflow-hidden bg-[--surface]">
                  <img
                    src={article.ogImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-[--text-secondary]">
                    {article.readTime} min read
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[--text] mb-2 line-clamp-2 group-hover:text-[--primary] transition-colors"
                >
                  {article.title}
                </h3>
                <p className="text-sm text-[--text-secondary] line-clamp-2 mb-3">
                  {article.description}
                </p>
                <div className="text-xs text-[--text-secondary]">
                  {formatDate(article.date)}
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
