import Link from 'next/link';
import { Article } from '../lib/data';
import { ArticleCardImage } from './ArticleCardImage';

type Props = {
  article: Article;
  onDelete: (id: string) => void;
};

export function ArticleCard({ article, onDelete }: Props) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,transform] duration-300 will-change-transform">
      <Link
        href={`/article/${article.id}`}
        className="block relative aspect-video overflow-hidden bg-gray-100"
      >
        <ArticleCardImage src={article.imageUrl} title={article.title} focus="top" />
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/article/${article.id}`} className="block mb-3">
          <h2 className="text-xl font-bold text-gray-900 leading-tight group-hover:underline underline-offset-4 decoration-blue-600/30">
            {article.title}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">
          {article.content}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <Link
            href={`/article/${article.id}/edit`}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors py-2 px-1"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(article.id)}
            aria-label={`Delete ${article.title}`}
            className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors py-2 px-1"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
