import { apolloClient } from './apolloClient';
import { GET_ARTICLES, GET_ARTICLE, DELETE_ARTICLE } from './graphql';

export type Article = {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
};

type ArticlesResponse = {
    articles: Article[];
};

type ArticleResponse = {
    article: Article | null;
};

export async function getArticles(limit = 10, offset = 0): Promise<{ articles: Article[]; hasMore: boolean }> {
    const { data } = await apolloClient.query<ArticlesResponse>({
        query: GET_ARTICLES,
        variables: { limit, offset },
        fetchPolicy: 'no-cache',
    });

    const articles = data?.articles ?? [];
    const hasMore = articles.length === limit;

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

export async function deleteArticle(id: string): Promise<void> {
    await apolloClient.mutate({
        mutation: DELETE_ARTICLE,
        variables: { id },
    });
}
