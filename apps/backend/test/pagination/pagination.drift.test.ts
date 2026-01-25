import { AppDataSource } from '../../src/data-source';
import { SportsArticle } from '../../src/entities/SportsArticle';
import { resolvers } from '../../src/resolvers';

describe('Pagination behavior', () => {
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

  it('can duplicate items across pages if new rows are inserted between requests (offset drift)', async () => {
    const repo = AppDataSource.getRepository(SportsArticle);

    const base = new Date('2026-01-24T12:00:00.000Z').getTime();

    for (let i = 0; i < 20; i++) {
      await repo.save(
        repo.create({
          title: `A${i}`,
          content: 'x',
          imageUrl: 'https://images.unsplash.com/x',
          createdAt: new Date(base - i * 1000),
        })
      );
    }

    const page1 = (await resolvers.Query.articles(null, {
      limit: 10,
      offset: 0,
    })) as SportsArticle[];

    const page1Ids = page1.map((a) => Number(a.id));

    await repo.save(
      repo.create({
        title: 'NEW',
        content: 'x',
        imageUrl: 'https://images.unsplash.com/x',
        createdAt: new Date(base + 10_000),
      })
    );

    const page2 = (await resolvers.Query.articles(null, {
      limit: 10,
      offset: 10,
    })) as SportsArticle[];

    const page2Ids = page2.map((a) => Number(a.id));

    const duplicates = page2Ids.filter((id) => page1Ids.includes(id));
    expect(duplicates.length).toBeGreaterThan(0);
  }, 10000);

  it('orders deterministically by createdAt desc, id desc (tiebreaker)', async () => {
    const repo = AppDataSource.getRepository(SportsArticle);

    const same = new Date('2026-01-24T00:00:00.000Z');

    await repo.save(
      repo.create({ title: 'a', content: 'x', imageUrl: 'x', createdAt: same } as any)
    );
    await repo.save(
      repo.create({ title: 'b', content: 'x', imageUrl: 'x', createdAt: same } as any)
    );
    await repo.save(
      repo.create({ title: 'c', content: 'x', imageUrl: 'x', createdAt: same } as any)
    );

    const items = (await resolvers.Query.articles(null, {
      limit: 10,
      offset: 0,
    })) as SportsArticle[];

    const sameItems = items.filter((i: any) => {
      return new Date(i.createdAt).getTime() === same.getTime();
    });

    const ids = sameItems.map((i: any) => Number(i.id));
    const sorted = [...ids].sort((a, b) => b - a);

    expect(ids).toEqual(sorted);
  });
});
