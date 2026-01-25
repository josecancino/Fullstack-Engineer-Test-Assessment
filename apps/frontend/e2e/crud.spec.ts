import { test } from '@playwright/test';
import { ArticlePage } from './pages/ArticlePage';

test.describe('Article CRUD Flow', () => {
  const timestamp = Date.now();
  const articleTitle = `E2E Test Article ${timestamp}`;
  const articleContent = 'This is a test article content created by Playwright E2E tests.';
  const articleImage = 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=3538&auto=format&fit=crop';
  const updatedTitle = `${articleTitle} - Updated`;

  test('should create, view, edit, and delete an article', async ({ page }) => {
    const articlePage = new ArticlePage(page);

    await test.step('1. Navigate to Home', async () => {
      console.log('\n--- Step 1: Navigating to Home ---');
      await articlePage.goto();
    });

    let articleId = '';
    await test.step('2. Create Article', async () => {
      console.log(`\n--- Step 2: Creating Article with title: "${articleTitle}" ---`);
      articleId = await articlePage.createArticle(articleTitle, articleContent, articleImage);
      console.log(`Article Created. ID: ${articleId}`);
    });

    await test.step('3. Verify Article Details', async () => {
      console.log(`\n--- Step 3: Verifying details for Article ID: ${articleId} ---`);
      await articlePage.verifyArticleDetails(articleId, articleTitle, articleContent);
    });

    await test.step('4. Verify Article in Home', async () => {
      console.log(`\n--- Step 4: Verifying Article "${articleTitle}" appears in Home list ---`);
      await articlePage.verifyArticleInHome(articleId, articleTitle);
    });

    await test.step('5. Edit Article', async () => {
      console.log(`\n--- Step 5: Editing Article ID: ${articleId} -> New Title: "${updatedTitle}" ---`);
      await articlePage.editArticle(articleId, updatedTitle);
    });

    await test.step('6. Verify Article Updated in Home', async () => {
      console.log(`\n--- Step 6: Verifying Updated Title in Home ---`);
      await articlePage.verifyArticleInHome(articleId, updatedTitle);
    });

    await test.step('7. Delete Article', async () => {
      console.log(`\n--- Step 7: Deleting Article ID: ${articleId} ---`);
      await articlePage.deleteArticle(articleId);
    });

    await test.step('8. Verify Removal', async () => {
      console.log(`\n--- Step 8: Verifying Article ID: ${articleId} is gone ---`);
      await articlePage.verifyArticleDeleted(articleId);
    });
  });
});
