import type { NextApiRequest, NextApiResponse } from 'next';
import { addPlayerToRoom, isRoomExists } from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nickname, code } = req.body;
  if (!nickname || !code) {
    return res.status(400).json({ error: 'Nickname and code are required' });
  }

  // Проверяем, что комната существует
  const exists = await isRoomExists(code);
  if (!exists) {
    return res.status(404).json({ error: 'Room not found or expired' });
  }

  // Добавляем игрока
  const success = await addPlayerToRoom(code, nickname);
  if (!success) {
    return res.status(500).json({ error: 'Failed to add player to the room' });
  }

  res.status(200).json({ message: 'Joined the room successfully' });
}
