import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client/react';

import { getArticles, Article } from '../lib/data';
import { DELETE_ARTICLE } from '../lib/graphql';

import { Navbar } from '../components/Navbar';
import { ArticleCard } from '../components/ArticleCard';
import { EmptyState } from '../components/EmptyState';
import { LoadMore } from '../components/LoadMore';

type DeleteArticleResult = { deleteArticle: boolean };
type DeleteArticleVars = { id: string };
type Props = {
  initialArticles: Article[];
  initialHasMore: boolean;
};

const PAGE_SIZE = 10;

export default function Home({ initialArticles, initialHasMore }: Props) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteArticleMutation] = useMutation<DeleteArticleResult, DeleteArticleVars>(
    DELETE_ARTICLE
  );

  const fetchMoreArticles = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const offset = articles.length;
      const result = await getArticles(PAGE_SIZE, offset);

      setArticles((prev) => [...prev, ...result.articles]);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Err: Fetching more articles', error);
      alert('Error while fetching more articles.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, articles.length]);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm('Are you sure you want to delete this article?')) return;

      const prevArticles = articles;
      setArticles((prev) => prev.filter((a) => a.id !== id));

      try {
        const { data } = await deleteArticleMutation({
          variables: { id },
        });

        if (!data?.deleteArticle) {
          setArticles(prevArticles);
          alert('Failed to delete article.');
          return;
        }

        if (hasMore) {
          try {
            const offset = prevArticles.length - 1;
            const result = await getArticles(1, offset);

            if (result.articles.length > 0) {
              setArticles((cur) => [...cur, ...result.articles]);
              setHasMore(result.hasMore);
            } else {
              setHasMore(false);
            }
          } catch {}
        } else {
          setHasMore(false);
        }
      } catch (error) {
        setArticles(prevArticles);
        console.error('Err: Deleting article', error);
        alert('Network error while deleting article.');
      }
    },
    [articles, hasMore, deleteArticleMutation]
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb] selection:bg-blue-100 selection:text-blue-900">
      <Head>
        <title>Sport</title>
        <meta
          name="description"
          content="Stay updated with the latest sport news, tactical analysis, and scouting reports."
        />
      </Head>

      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-8">
        <div className="flex justify-end mb-6">
          <Link
            href="/article/new"
            data-testid="create-article-button"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 uppercase tracking-wide"
          >
            Create Article
          </Link>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} onDelete={handleDelete} />
          ))}
        </section>

        <LoadMore isLoading={isLoading} hasMore={hasMore} onLoadMore={fetchMoreArticles} />

        {articles.length === 0 && !isLoading && <EmptyState />}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const offset = 0;
    const { articles, hasMore } = await getArticles(PAGE_SIZE, offset);

    const sanitizedArticles = (articles || []).map((article) => ({
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
