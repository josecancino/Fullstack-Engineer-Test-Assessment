export const ArticleService = {
  async delete(id: string): Promise<boolean> {
    const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    return res.ok;
  },
};
