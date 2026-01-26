import type { NextApiRequest, NextApiResponse } from 'next';
import { getArticles } from '@/lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const articles = await getArticles();
      return res.status(200).json(articles);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message || 'Internal server error' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
