import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { getArticles, Article } from '../lib/data';
import { ArticleService } from '../lib/api';
import { Navbar } from '../components/Navbar';
import { ArticleCard } from '../components/ArticleCard';
import { EmptyState } from '../components/EmptyState';
import { LoadMore } from '../components/LoadMore';

type Props = {
  initialArticles: Article[];
  initialHasMore: boolean;
};

export default function Home({ initialArticles, initialHasMore }: Props) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreArticles = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const result = await getArticles(10, articles.length);
      setArticles((prev) => [...prev, ...result.articles]);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Err: Fetching more articles', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, articles.length]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const success = await ArticleService.delete(id);
      if (success) {
        setArticles((prev) => prev.filter(a => a.id !== id));

        if (hasMore) {
          try {
            const result = await getArticles(1, articles.length - 1);
            if (result.articles.length > 0) {
              setArticles((prev) => [...prev, ...result.articles]);
              setHasMore(result.hasMore);
            }
          } catch (fetchError) {
            console.warn('Quietly failed to fill gap:', fetchError);
          }
        }
      }
    } catch (error) {
      console.error('Err: Deleting article', error);
      alert('Network error while deleting article.');
    }
  }, [hasMore, articles.length]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb] selection:bg-blue-100 selection:text-blue-900">
      <Head>
        <title>Sport</title>
        <meta name="description" content="Stay updated with the latest sport news, tactical analysis, and scouting reports." />
      </Head>

      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-8">
        <div className="flex justify-end mb-6">
          <Link
            href="/articles/create"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 uppercase tracking-wide"
          >
            Create Article
          </Link>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onDelete={handleDelete}
            />
          ))}
        </section>

        <LoadMore
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={fetchMoreArticles}
        />

        {articles.length === 0 && !isLoading && <EmptyState />}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { articles, hasMore } = await getArticles(10, 0);

    const sanitizedArticles = (articles || []).map(article => ({
      id: article.id,
      title: article.title,
      content: article.content,
      imageUrl: article.imageUrl ?? null,
      createdAt: article.createdAt,
    }));

    return {
      props: {
        initialArticles: sanitizedArticles,
        initialHasMore: !!hasMore,
      },
    };
  } catch (error) {
    console.error('SSR Critical Failure:', error);
    return { props: { initialArticles: [], initialHasMore: false } };
  }
};
