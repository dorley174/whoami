import { Redis } from '@upstash/redis';
import { v4 as uuidv4 } from 'uuid';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const TTL_SECONDS = 60 * 60 * 2;

export type Participant = {
  id: string;
  nickname: string;
};

export type RoomData = {
  players: { id: string; nickname: string }[];
  spectators: { id: string; nickname: string }[];
  createdAt: number;
};

export async function setRoom(code: string, data: RoomData) {
  await redis.set(`room:${code}`, data, { ex: TTL_SECONDS });
}

export async function getRoom(code: string): Promise<RoomData | null> {
  return await redis.get(`room:${code}`);
}

export async function isRoomExists(code: string): Promise<boolean> {
  const room = await redis.get(`room:${code}`);
  return room !== null;
}

export async function addSpectator(code: string, user: { id: string; nickname: string }) {
  try {
    const room = await getRoom(code);
    if (!room) return false;

    const alreadyExists =
      room.spectators.some((s) => s.id === user.id || s.nickname === user.nickname) ||
      room.players.some((p) => p.id === user.id || p.nickname === user.nickname);
    if (alreadyExists) return false;

    room.spectators.push(user);
    await setRoom(code, room);
    return true;
  } catch {
    return false;
  }
}

export async function promoteToPlayer(code: string, nickname: string): Promise<boolean> {
  const room = await getRoom(code);
  if (!room) return false;

  const index = room.spectators.findIndex((p) => p.nickname === nickname);
  if (index === -1) return false;

  const person = room.spectators.splice(index, 1)[0];
  room.players.push(person);
  await setRoom(code, room);
  return true;
}

export async function setInputValue(code: string, playerId: string, value: string) {
  await redis.hset(`room_inputs:${code}`, { [playerId]: value });
}

export async function setInputValues(code: string, id: string, value: string) {
  const key = `inputValues:${code}`;
  const existing = (await redis.get<Record<string, string>>(key)) || {};
  const updated = { ...existing, [id]: value };
  await redis.set(key, updated, { ex: TTL_SECONDS });
}

export async function getInputValues(code: string): Promise<Record<string, string>> {
  const key = `inputValues:${code}`;
  return (await redis.get(key)) || {};
}
