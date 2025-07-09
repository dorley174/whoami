import type { NextApiRequest, NextApiResponse } from 'next';
import { isRoomExists, addSpectator } from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nickname, code, id } = req.body;
  if (!nickname || !code || !id) {
    return res.status(400).json({ error: 'Nickname, id and code are required' });
  }

  const exists = await isRoomExists(code);
  if (!exists) {
    return res.status(404).json({ error: 'Room not found or expired' });
  }

  const added = await addSpectator(code, { id, nickname });
  if (!added) {
    return res.status(400).json({ error: 'Nickname or ID already in use' });
  }

  res.status(200).json({ message: 'Joined successfully' });
}
