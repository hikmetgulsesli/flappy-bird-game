interface AuthorBoxProps {
  author: string;
  authorImage?: string;
  date: string;
}

export function AuthorBox({ author, authorImage, date }: AuthorBoxProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-[--bg] rounded-xl border border-[--border] p-6 mt-12">
      <div className="flex items-center gap-4">
        {authorImage ? (
          <img
            src={authorImage}
            alt={author}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[--primary]/10 flex items-center justify-center">
            <span className="text-2xl font-semibold text-[--primary]">
              {author.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm text-[--text-secondary] mb-1">Written by</p>
          <p className="text-lg font-semibold text-[--text]">{author}</p>
          <p className="text-sm text-[--text-secondary]">{formatDate(date)}</p>
        </div>
      </div>
    </div>
  );
}
