import type { NextApiRequest, NextApiResponse } from 'next';
import { generateRoomCode } from '@/lib/roomStore';
import { setRoom, isRoomExists } from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { nickname } = req.body;
    if (!nickname || typeof nickname !== 'string') {
      return res.status(400).json({ error: 'Nickname is required' });
    }

    let code = generateRoomCode();
    let attempts = 0;
    while ((await isRoomExists(code)) && attempts < 5) {
      code = generateRoomCode();
      attempts++;
    }

    await setRoom(code, { players: [nickname] });

    res.status(200).json({ code });
  } catch (err: any) {
    console.error("API Error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
