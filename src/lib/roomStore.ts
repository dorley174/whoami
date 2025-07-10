type Room = {
  code: string;
  players: string[];
  createdAt: number;
};

const rooms: Record<string, Room> = {};

export function generateRoomCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
}

export function createRoom(nickname: string): string {
  let code = generateRoomCode();
  while (rooms[code]) code = generateRoomCode();

  rooms[code] = {
    code,
    players: [nickname],
    createdAt: Date.now(),
  };

  return code;
}

export function joinRoom(code: string, nickname: string): boolean {
  const room = rooms[code];
  if (!room) return false;
  if (Date.now() - room.createdAt > 2 * 60 * 60 * 1000) {
    delete rooms[code];
    return false;
  }

  if (!room.players.includes(nickname)) {
    room.players.push(nickname);
  }

  return true;
}

export function getRoom(code: string): Room | null {
  const room = rooms[code];
  if (!room) return null;
  if (Date.now() - room.createdAt > 12 * 60 * 60 * 1000) {
    delete rooms[code];
    return null;
  }
  return room;
}
