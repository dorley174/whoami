import { NextApiRequest, NextApiResponse } from 'next';
import { createRoom } from '@/lib/roomStore';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nickname } = req.body;
  if (!nickname) return res.status(400).json({ error: 'Nickname is required' });

  const code = createRoom(nickname);
  res.status(200).json({ code });
}
