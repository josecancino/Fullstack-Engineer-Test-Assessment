import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navbar } from '@/components/Navbar';
import { ArticleInput, createArticle } from '@/lib/data';
import ArticleForm from '@/components/ArticleForm';

export default function CreateArticlePage() {
  const router = useRouter();

  const handleCreate = async (data: ArticleInput) => {
    await createArticle(data);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Head>
        <title>Create Article | Sport</title>
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">
            Create Article
          </h1>
        </header>

        <div className="max-w-3xl">
          <ArticleForm onSubmit={handleCreate} submitLabel="Create" />
        </div>
      </main>
    </div>
  );
}
