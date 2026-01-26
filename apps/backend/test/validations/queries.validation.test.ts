import { AppDataSource } from '../../src/data-source';
import { SportsArticle } from '../../src/entities/SportsArticle';
import { resolvers } from '../../src/resolvers';

describe('Query validations', () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(SportsArticle).clear();
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  describe('articles (pagination)', () => {
    it('throws error when limit is not a positive integer', async () => {
      await expect(resolvers.Query.articles(null, { limit: 0, offset: 0 })).rejects.toThrow(
        '`limit` must be a positive integer'
      );

      await expect(resolvers.Query.articles(null, { limit: -5, offset: 0 })).rejects.toThrow(
        '`limit` must be a positive integer'
      );

      await expect(resolvers.Query.articles(null, { limit: 1.5, offset: 0 })).rejects.toThrow(
        '`limit` must be a positive integer'
      );
    });

    it('throws error when offset is negative', async () => {
      await expect(resolvers.Query.articles(null, { limit: 10, offset: -1 })).rejects.toThrow(
        '`offset` must be a positive integer'
      );
    });

    it('throws error when offset is not an integer', async () => {
      await expect(resolvers.Query.articles(null, { limit: 10, offset: 1.5 })).rejects.toThrow(
        '`offset` must be a positive integer'
      );
    });
  });

  describe('article (single)', () => {
    it('throws error when id is empty or whitespace', async () => {
      await expect(resolvers.Query.article(null, { id: '' })).rejects.toThrow('Invalid article id');

      await expect(resolvers.Query.article(null, { id: '   ' })).rejects.toThrow(
        'Invalid article id'
      );
    });

    it('throws error when id is invalid (not a number)', async () => {
      await expect(resolvers.Query.article(null, { id: 'invalid-id' })).rejects.toThrow(
        'ID must be a number'
      );
    });

    it('throws error when article does not exist', async () => {
      await expect(resolvers.Query.article(null, { id: '999999' })).rejects.toThrow(
        'Article not found'
      );
    });
  });
});
