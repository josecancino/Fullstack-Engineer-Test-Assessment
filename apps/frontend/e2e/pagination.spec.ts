import { test, expect } from '@playwright/test';

test.describe('Pagination and Deletion Behavior', () => {
  test('should maintain order and refill list after deletion', async ({ page }) => {
    const cards = page.locator('[data-testid^="article-card-"]');

    const getArticleIds = async (): Promise<string[]> => {
      return await cards.evaluateAll((els) =>
        els.map((el) => el.getAttribute('data-testid')!.replace('article-card-', ''))
      );
    };

    let initialIds: string[] = [];
    let idToDelete = '';
    const indexToDelete = 2;

    await test.step('1. Setup: Navigate to Home', async () => {
      await page.goto('/');
    });

    await test.step('2. Load More Items (Expect 20)', async () => {
      await expect(cards).toHaveCount(10);

      const loadMoreButton = page.getByTestId('load-more-button');
      await loadMoreButton.click();

      await expect(cards).toHaveCount(20);
    });

    await test.step('3. Capture Initial State', async () => {
      initialIds = await getArticleIds();
      console.log(`Initial IDs (${initialIds.length}):`, initialIds);

      const initialUnique = new Set(initialIds);
      expect(initialUnique.size, 'Initial list has duplicates').toBe(initialIds.length);
    });

    await test.step(`4. Delete item at index ${indexToDelete}`, async () => {
      idToDelete = initialIds[indexToDelete];
      console.log(`Deleting ID: ${idToDelete}`);

      page.once('dialog', (dialog) => dialog.accept());

      await cards
        .nth(indexToDelete)
        .locator(`button[data-testid="delete-article-${idToDelete}"]`)
        .click();

      await expect(page.getByTestId(`article-card-${idToDelete}`)).toHaveCount(0);
    });

    let finalIds: string[] = [];
    await test.step('5. Verify Refill (Wait for 20 items)', async () => {
      await expect(cards).toHaveCount(20);

      finalIds = await getArticleIds();
      console.log(`Final IDs (${finalIds.length}):`, finalIds);
    });

    await test.step('6. Verifications', async () => {
      expect(finalIds).not.toContain(idToDelete);

      expect(finalIds.slice(0, indexToDelete)).toEqual(initialIds.slice(0, indexToDelete));

      expect(finalIds.slice(indexToDelete, 19)).toEqual(initialIds.slice(indexToDelete + 1));

      const newItemId = finalIds[19];
      expect(initialIds).not.toContain(newItemId);

      expect(new Set(finalIds).size, 'Final list has duplicates').toBe(finalIds.length);
    });
  });
});
