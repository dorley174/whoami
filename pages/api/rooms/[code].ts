import type { NextApiRequest, NextApiResponse } from 'next';
import { getRoom, getInputValues } from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (typeof code !== 'string') {
    return res.status(400).json({ error: 'Invalid room code' });
  }

  const room = await getRoom(code);
  if (!room) {
    return res.status(404).json({ error: 'Room not found or expired' });
  }

  const inputValues = await getInputValues(code);
  res.status(200).json({ ...room, inputValues });
}
