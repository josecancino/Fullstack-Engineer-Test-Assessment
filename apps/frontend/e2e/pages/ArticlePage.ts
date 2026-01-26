import { type Page, expect, test } from '@playwright/test';

export class ArticlePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await test.step('Navigate to Home', async () => {
      await this.page.goto('/');
      await expect(this.page).toHaveTitle(/Sport/);
    });
  }

  async createArticle(title: string, content: string, imageUrl: string): Promise<string> {
    return await test.step('Create Article', async () => {
      await this.page.getByTestId('create-article-button').click();
      await expect(this.page).toHaveURL('/article/new');

      await this.page.getByTestId('article-title-input').fill(title);
      await this.page.getByTestId('article-content-input').fill(content);
      await this.page.getByTestId('article-image-url-input').fill(imageUrl);

      await this.page.getByTestId('submit-article-button').click();

      await expect(this.page).toHaveURL(/\/article\/\d+/);
      const url = this.page.url();
      const articleId = url.split('/').pop();
      if (!articleId) throw new Error('Article ID not found in URL');

      return articleId;
    });
  }

  async verifyArticleDetails(id: string, title: string, content: string) {
    await test.step('Verify Article Details', async () => {
      if (!this.page.url().includes(`/article/${id}`)) {
        await this.page.goto(`/article/${id}`);
      }

      await expect(this.page.getByTestId('article-detail-title')).toHaveText(title);
      await expect(this.page.getByTestId('article-detail-content')).toHaveText(content);
    });
  }

  async editArticle(id: string, newTitle: string) {
    await test.step('Edit Article', async () => {
      await this.goto();

      await this.page.getByTestId(`edit-article-${id}`).click();
      await expect(this.page).toHaveURL(new RegExp(`/article/${id}/edit`));

      await this.page.getByTestId('article-title-input').fill(newTitle);
      await this.page.getByTestId('submit-article-button').click();

      await expect(this.page).toHaveURL(new RegExp(`/article/${id}`));
      await expect(this.page.getByTestId('article-detail-title')).toHaveText(newTitle);
    });
  }

  async verifyArticleInHome(id: string, title: string) {
    await test.step('Verify Article in Home', async () => {
      await this.goto();
      await expect(this.page.getByTestId(`article-title-${id}`)).toHaveText(title);
    });
  }

  async deleteArticle(id: string) {
    await test.step('Delete Article', async () => {
      await this.goto();

      this.page.once('dialog', (dialog) => dialog.accept());

      await this.page.getByTestId(`delete-article-${id}`).click();

      await expect(this.page.getByTestId(`article-title-${id}`)).toHaveCount(0);
    });
  }

  async verifyArticleDeleted(id: string) {
    await test.step('Verify Article Deleted', async () => {
      await this.goto();
      await expect(this.page.getByTestId(`article-title-${id}`)).toHaveCount(0);
    });
  }
}
