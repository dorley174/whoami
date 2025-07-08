import { NextApiRequest, NextApiResponse } from 'next';
import { joinRoom } from '@/lib/roomStore';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, nickname } = req.body;
  if (!code || !nickname) return res.status(400).json({ error: 'Missing fields' });

  const success = joinRoom(code.toUpperCase(), nickname);
  if (!success) return res.status(404).json({ error: 'Room not found or expired' });

  res.status(200).json({ message: 'Joined' });
}
