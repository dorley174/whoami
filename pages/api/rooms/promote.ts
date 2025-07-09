import type { NextApiRequest, NextApiResponse } from 'next';
import { promoteToPlayer } from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code, nickname } = req.body;
  if (!code || !nickname) {
    return res.status(400).json({ error: 'Code and nickname are required' });
  }

  const success = await promoteToPlayer(code, nickname);
  if (!success) {
    return res.status(400).json({ error: 'Failed to promote spectator to player' });
  }

  res.status(200).json({ message: 'User promoted to player' });
}
