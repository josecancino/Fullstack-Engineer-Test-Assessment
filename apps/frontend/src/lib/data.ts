import { apolloClient } from './apolloClient';
import {
  GET_ARTICLES,
  GET_ARTICLE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
} from './graphql';

export const ALLOWED_IMAGE_HOSTS = ['images.unsplash.com', 'plus.unsplash.com'];

export type Article = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  createdAt: string;
};

export type ArticleInput = {
  title: string;
  content: string;
  imageUrl?: string | null;
};

type ArticlesResponse = {
  articles: Article[];
};

type ArticleResponse = {
  article: Article | null;
};

type CreateArticleResponse = {
  createArticle: Article;
};

type UpdateArticleResponse = {
  updateArticle: Article;
};

export async function getArticles(
  limit = 10,
  offset = 0
): Promise<{ articles: Article[]; hasMore: boolean }> {
  const fetchLimit = limit + 1;

  const { data } = await apolloClient.query<ArticlesResponse>({
    query: GET_ARTICLES,
    variables: { limit: fetchLimit, offset },
    fetchPolicy: 'no-cache',
  });

  const rawArticles = data?.articles ?? [];
  const hasMore = rawArticles.length > limit;

  const articles = hasMore ? rawArticles.slice(0, limit) : rawArticles;

  return { articles, hasMore };
}

export async function getArticle(id: string): Promise<Article | null> {
  try {
    const { data } = await apolloClient.query<ArticleResponse>({
      query: GET_ARTICLE,
      variables: { id },
      fetchPolicy: 'no-cache',
    });
    return data?.article ?? null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function createArticle(input: ArticleInput): Promise<Article> {
  const { data } = await apolloClient.mutate<CreateArticleResponse>({
    mutation: CREATE_ARTICLE,
    variables: { input },
  });

  if (!data?.createArticle) {
    throw new Error('Failed to create article');
  }

  return data.createArticle;
}

export async function updateArticle(id: string, input: ArticleInput): Promise<Article> {
  const { data } = await apolloClient.mutate<UpdateArticleResponse>({
    mutation: UPDATE_ARTICLE,
    variables: { id, input },
  });

  if (!data?.updateArticle) {
    throw new Error('Failed to update article');
  }

  return data.updateArticle;
}

export async function deleteArticle(id: string): Promise<void> {
  await apolloClient.mutate({
    mutation: DELETE_ARTICLE,
    variables: { id },
  });
}
