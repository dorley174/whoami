import type { NextApiRequest, NextApiResponse } from 'next';
import { promoteToPlayer, getRoom } from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { code, nickname } = req.body;

  if (!code || !nickname) {
    return res.status(400).json({ error: 'Missing code or nickname' });
  }

  const success = await promoteToPlayer(code, nickname);
  if (!success) {
    return res.status(400).json({ error: 'Promotion failed' });
  }

  const updatedRoom = await getRoom(code);
  res.status(200).json(updatedRoom);
}
