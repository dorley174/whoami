import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// TTL = 12 часов (в секундах)
const TTL_SECONDS = 60 * 60 * 12;

// Сохранение комнаты
export async function setRoom(code: string, data: { players: string[] }) {
  await redis.set(`room:${code}`, data, { ex: TTL_SECONDS });
}

// Проверка существования комнаты
export async function isRoomExists(code: string): Promise<boolean> {
  const room = await redis.get(`room:${code}`);
  return room !== null;
}

// Получение комнаты
export async function getRoom(code: string): Promise<{ players: string[] } | null> {
  return await redis.get(`room:${code}`);
}

// Добавление игрока
export async function addPlayerToRoom(code: string, nickname: string) {
  const room = await getRoom(code);
  if (!room) return false;

  // Не добавляем повторно
  if (!room.players.includes(nickname)) {
    room.players.push(nickname);
    await setRoom(code, room);
  }

  return true;
}
