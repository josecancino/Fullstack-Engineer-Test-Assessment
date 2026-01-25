import { AppDataSource } from '../../src/data-source';
import { SportsArticle } from '../../src/entities/SportsArticle';
import { resolvers } from '../../src/resolvers';

describe('Mutation validations', () => {
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

  describe('createArticle', () => {
    it('throws error when title is empty', async () => {
      const input = {
        title: '',
        content: 'Valid content',
      };

      await expect(
        resolvers.Mutation.createArticle(null, { input })
      ).rejects.toThrow('Title and content are required');
    });

    it('throws error when content is empty', async () => {
      const input = {
        title: 'Valid title',
        content: '',
      };

      await expect(
        resolvers.Mutation.createArticle(null, { input })
      ).rejects.toThrow('Title and content are required');
    });

    it('throws error when title is only whitespace', async () => {
      const input = {
        title: '   ',
        content: 'Valid content',
      };

      await expect(
        resolvers.Mutation.createArticle(null, { input })
      ).rejects.toThrow('Title and content are required');
    });

    it('throws error when content is only whitespace', async () => {
      const input = {
        title: 'Valid title',
        content: '   ',
      };

      await expect(
        resolvers.Mutation.createArticle(null, { input })
      ).rejects.toThrow('Title and content are required');
    });
  });

  describe('updateArticle', () => {
    it('throws error when id is empty or whitespace', async () => {
      const input = {
        title: 'Valid title',
        content: 'Valid content',
      };

      await expect(
        resolvers.Mutation.updateArticle(null, { id: '', input })
      ).rejects.toThrow('Invalid article id');

      await expect(
        resolvers.Mutation.updateArticle(null, { id: '   ', input })
      ).rejects.toThrow('Invalid article id');
    });

    it('throws error when id is invalid (not a number)', async () => {
      const input = {
        title: 'Valid title',
        content: 'Valid content',
      };

      await expect(
        resolvers.Mutation.updateArticle(null, { id: 'invalid-id', input })
      ).rejects.toThrow('ID must be a number');
    });

    it('throws error when article does not exist', async () => {
      const input = {
        title: 'Valid title',
        content: 'Valid content',
      };

      await expect(
        resolvers.Mutation.updateArticle(null, { id: '999999', input })
      ).rejects.toThrow('Article not found');
    });

    it('throws error when title is empty', async () => {
      const repo = AppDataSource.getRepository(SportsArticle);
      const article = await repo.save(
        repo.create({
          title: 'Original Title',
          content: 'Original Content',
        })
      );

      const input = {
        title: '',
        content: 'New Content',
      };

      await expect(
        resolvers.Mutation.updateArticle(null, { id: String(article.id), input })
      ).rejects.toThrow('Title and content are required');
    });

    it('throws error when content is empty', async () => {
      const repo = AppDataSource.getRepository(SportsArticle);
      const article = await repo.save(
        repo.create({
          title: 'Original Title',
          content: 'Original Content',
        })
      );

      const input = {
        title: 'Valid Title',
        content: '',
      };

      await expect(
        resolvers.Mutation.updateArticle(null, { id: String(article.id), input })
      ).rejects.toThrow('Title and content are required');
    });
  });

  describe('deleteArticle', () => {
    it('throws error when id is empty or whitespace', async () => {
      await expect(
        resolvers.Mutation.deleteArticle(null, { id: '' })
      ).rejects.toThrow('Invalid article id');

      await expect(
        resolvers.Mutation.deleteArticle(null, { id: '   ' })
      ).rejects.toThrow('Invalid article id');
    });

    it('throws error when id is invalid', async () => {
      await expect(
        resolvers.Mutation.deleteArticle(null, { id: 'invalid-id' })
      ).rejects.toThrow('ID must be a number');
    });

    it('throws error when article does not exist', async () => {
      await expect(
        resolvers.Mutation.deleteArticle(null, { id: '999999' })
      ).rejects.toThrow('Article not found');
    });
  });
});
