import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getArticle, Article, ArticleInput, updateArticle } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import ArticleForm from '@/components/ArticleForm';
import Head from 'next/head';

type Props = {
  article: Article;
};

export default function EditArticlePage({ article }: Props) {
  const router = useRouter();

  const handleUpdate = async (data: ArticleInput) => {
    await updateArticle(article.id, data);
    router.push(`/article/${article.id}`);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Head>
        <title>Edit Article | Sport</title>
      </Head>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">
            Edit Article
          </h1>
        </header>

        <div className="max-w-3xl">
          <ArticleForm
            initialData={{
              title: article.title,
              content: article.content,
              imageUrl: article.imageUrl ?? null,
            }}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const article = await getArticle(id);

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: {
        id: article.id,
        title: article.title,
        content: article.content,
        imageUrl: article.imageUrl ?? null,
        createdAt: article.createdAt,
      },
    },
  };
};
