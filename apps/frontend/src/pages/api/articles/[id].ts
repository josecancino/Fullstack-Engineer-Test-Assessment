import type { NextApiRequest, NextApiResponse } from 'next';
import { getArticle, deleteArticle } from '../../../lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
        if (req.method === 'GET') {
            const article = await getArticle(id);
            if (!article) return res.status(404).json({ message: 'Article not found' });
            return res.status(200).json(article);
        }

        if (req.method === 'DELETE') {
            await deleteArticle(id);
            return res.status(204).end();
        }

        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error: any) {
        console.error('API Error:', error);
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
}
