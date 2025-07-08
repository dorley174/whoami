import { NextApiRequest, NextApiResponse } from 'next';
import { getRoom } from '@/lib/roomStore';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;
  const room = getRoom(code.toUpperCase());

  if (!room) return res.status(404).json({ error: 'Room not found or expired' });

  res.status(200).json({ players: room.players });
}
