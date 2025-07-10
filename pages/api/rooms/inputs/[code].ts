import type { NextApiRequest, NextApiResponse } from 'next';
import { getInputValues, setInputValues } from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (typeof code !== 'string') {
    return res.status(400).json({ error: 'Invalid room code' });
  }

  if (req.method === 'GET') {
    const values = await getInputValues(code);
    res.status(200).json(values);
  } else if (req.method === 'POST') {
    const { id, value } = req.body;
    if (!id || typeof value !== 'string') {
      return res.status(400).json({ error: 'Missing id or value' });
    }

    await setInputValues(code, id, value);
    res.status(200).json({ success: true });
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
