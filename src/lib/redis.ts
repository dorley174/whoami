import { Redis } from '@upstash/redis';

console.log('Redis URL:', process.env.UPSTASH_REDIS_REST_URL);
console.log('Redis Token:', process.env.UPSTASH_REDIS_REST_TOKEN);


export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// TTL = 12 часов (в секундах)
const TTL_SECONDS = 60 * 60 * 12;

// Сохранение комнаты
export async function setRoom(code: string, data: { players: string[] }) {
  try {
    console.log(`Setting room with code: ${code}`);
    await redis.set(`room:${code}`, data, { ex: TTL_SECONDS });
    console.log(`Room with code ${code} saved successfully`);
  } catch (err) {
    console.error(`Error setting room ${code}:`, err);
    throw new Error('Failed to set room');
  }
}


// Проверка существования комнаты
export async function isRoomExists(code: string): Promise<boolean> {
  try {
    console.log(`Checking if room exists: ${code}`);
    const room = await redis.get(`room:${code}`);
    console.log(`Room exists check for ${code}:`, room ? 'Exists' : 'Does not exist');
    return room !== null;
  } catch (err) {
    console.error(`Error checking if room exists ${code}:`, err);
    return false;
  }
}

// Получение комнаты
export async function getRoom(code: string): Promise<{ players: string[] } | null> {
  try {
    return await redis.get(`room:${code}`);
  } catch (err) {
    console.error(`Error getting room ${code}:`, err);
    return null;
  }
}

export async function addPlayerToRoom(code: string, nickname: string) {
  try {
    const room = await getRoom(code);
    if (!room) return false;

    // Не добавляем повторно
    if (!room.players.includes(nickname)) {
      room.players.push(nickname);
      await setRoom(code, room);
    }

    return true;
  } catch (err) {
    console.error(`Error adding player ${nickname} to room ${code}:`, err);
    return false;
  }
}
