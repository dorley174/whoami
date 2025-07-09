import type { NextApiRequest, NextApiResponse } from 'next';
import { generateRoomCode } from '@/lib/roomStore';
import { setRoom, isRoomExists, RoomData } from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nickname, id } = req.body;
  if (!nickname || typeof nickname !== 'string' || !id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Nickname and id are required' });
  }

  let code = generateRoomCode();

  let attempts = 0;
  while ((await isRoomExists(code)) && attempts < 5) {
    code = generateRoomCode();
    attempts++;
  }

  const createdAt = Date.now();
  const roomData: RoomData = {
    players: [],
    spectators: [{ id, nickname }],
    createdAt,
  };

  await setRoom(code, roomData);
  res.status(200).json({ code });
}
