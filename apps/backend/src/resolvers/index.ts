import { AppDataSource } from '../data-source';
import { SportsArticle } from '../entities/SportsArticle';
import { GraphQLError } from 'graphql';

const articleRepo = AppDataSource.getRepository(SportsArticle);

type PaginationArgs = {
  limit?: number;
  offset?: number;
};

type ArticleInput = {
  title: string;
  content: string;
  imageUrl?: string | null;
};

const validateArticleInput = (input: ArticleInput) => {
  const { title, content } = input;

  if (!title?.trim() || !content?.trim()) {
    throw new GraphQLError('Title and content are required', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
};

const normalizePagination = ({ limit, offset }: PaginationArgs) => {
  const rawLimit = limit ?? 20;
  const rawOffset = offset ?? 0;

  if (!Number.isInteger(rawLimit) || rawLimit <= 0) {
    throw new GraphQLError('`limit` must be a positive integer', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  if (!Number.isInteger(rawOffset) || rawOffset < 0) {
    throw new GraphQLError('`offset` must be a positive integer', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  const take = Math.min(rawLimit, 50);
  const skip = rawOffset;

  return { take, skip };
};

export const resolvers = {
  Query: {
    articles: async (_parent: unknown, args: PaginationArgs) => {
      const { take, skip } = normalizePagination(args);

      return articleRepo.find({
        order: { createdAt: 'DESC' },
        take,
        skip,
      });
    },

    article: async (_parent: unknown, { id }: { id: string }) => {
      if (!id?.trim()) {
        throw new GraphQLError('Invalid article id', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const numericId = Number(id);
      if (isNaN(numericId)) {
        throw new GraphQLError('ID must be a number', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const article = await articleRepo.findOneBy({ id: numericId });

      if (!article) {
        throw new GraphQLError('Article not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return article;
    },
  },

  Mutation: {
    createArticle: async (_parent: unknown, { input }: { input: ArticleInput }) => {
      validateArticleInput(input);

      const article = articleRepo.create(input);
      return articleRepo.save(article);
    },

    updateArticle: async (_parent: unknown, { id, input }: { id: string; input: ArticleInput }) => {
      if (!id?.trim()) {
        throw new GraphQLError('Invalid article id', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      validateArticleInput(input);

      const numericId = Number(id);
      if (isNaN(numericId)) {
        throw new GraphQLError('ID must be a number', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const article = await articleRepo.findOneBy({ id: numericId });

      if (!article) {
        throw new GraphQLError('Article not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      articleRepo.merge(article, input);
      return articleRepo.save(article);
    },

    deleteArticle: async (_parent: unknown, { id }: { id: string }) => {
      if (!id?.trim()) {
        throw new GraphQLError('Invalid article id', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const numericId = Number(id);
      if (isNaN(numericId)) {
        throw new GraphQLError('ID must be a number', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const result = await articleRepo.softDelete(numericId);

      if (!result.affected) {
        throw new GraphQLError('Article not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return true;
    },
  },
};
