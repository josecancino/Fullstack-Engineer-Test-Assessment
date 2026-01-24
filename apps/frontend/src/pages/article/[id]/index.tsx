import { GetServerSideProps } from 'next';
import Head from 'next/head';
import sizeOf from 'image-size';
import { getArticle, Article } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { ArticleImage } from '@/components/ArticleImage';

type Orientation = 'portrait' | 'landscape' | null;
type ArticleWithOrientation = Article & { imageOrientation: Orientation };

type Props = {
  article: ArticleWithOrientation;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export default function ArticleDetailsPage({ article }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{article.title} | Sport</title>
      </Head>

      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <article className="flex flex-col items-center">
          <header className="w-full max-w-3xl text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-4">
              {article.title}
            </h1>

            {article.createdAt && (
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                {formatDate(article.createdAt)}
              </p>
            )}
          </header>

          <div className="w-full max-w-2xl mb-12 overflow-hidden rounded-3xl border bg-white shadow-xl">
            <ArticleImage
              src={article.imageUrl}
              title={article.title}
              priority
              imageOrientation={article.imageOrientation}
            />
          </div>

          <div className="w-full max-w-2xl prose prose-lg md:prose-xl prose-blue text-gray-800 whitespace-pre-wrap">
            {article.content}
          </div>
        </article>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const id = String(params?.id ?? '');
  const article = await getArticle(id);

  if (!article) return { notFound: true };

  let orientation: Orientation = null;

  if (article.imageUrl) {
    try {
      const res = await fetch(article.imageUrl, { redirect: 'follow' });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.startsWith('image/')) {
        const buffer = Buffer.from(await res.arrayBuffer());
        const { width, height } = sizeOf(buffer);
        if (width && height) orientation = height > width ? 'portrait' : 'landscape';
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Failed to detect image orientation:', article.imageUrl, err);
      }
    }
  }

  return {
    props: {
      article: {
        ...article,
        imageUrl: article.imageUrl ?? null,
        imageOrientation: orientation,
      },
    },
  };
};
