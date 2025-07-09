import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import avatar from '../../public/person.jpg';

type Participant = {
  id: string;
  nickname: string;
};

type RoomData = {
  players: Participant[];
  spectators: Participant[];
  createdAt: number;
};

const RoomPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [room, setRoom] = useState<RoomData | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  console.log('userId:', userId);
  console.log('room spectators:', room?.spectators);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setNickname(localStorage.getItem('nickname'));
      setUserId(localStorage.getItem('userId'));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setNickname(localStorage.getItem('nickname'));
    }
  }, []);

  useEffect(() => {
    if (!code) return;
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${code}`);
        if (!res.ok) throw new Error('Failed to load room');
        const data: RoomData = await res.json();
        setRoom(data);
      } catch (err) {
        setError('Failed to load room data');
      }
    };
    fetchRoom();
  }, [code]);

  const promote = async (nick: string) => {
    if (!code) return;
    setLoading(true);
    try {
      const res = await fetch('/api/rooms/promote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, nickname: nick }),
      });
      if (!res.ok) throw new Error('Promotion failed');
      const updatedRoom = await (await fetch(`/api/rooms/${code}`)).json();
      setRoom(updatedRoom);
    } catch {
      alert('Не удалось перевести в игроки');
    } finally {
      setLoading(false);
    }
  };

  if (!room || !nickname) return <p>Loading...</p>;

  return (
    <div>
      <h2>Игроки</h2>
      <ul>
        {room.players.map((p) => (
          <li key={p.id}>
            <Image src={avatar} alt="avatar" width={32} height={32} />
            {p.nickname}
            {p.nickname === nickname && ' (You)'}
          </li>
        ))}
      </ul>

      <h2>Наблюдатели</h2>
      <ul>
        {room.spectators.map((s) => (
          <li key={s.id}>
            <img src="/person.jpg" width={32} />
            {s.nickname}
            {s.id === userId && (
              <button disabled={loading} onClick={() => promote(s.nickname)}>
                +
              </button>
            )}
          </li>
        ))}
      </ul>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RoomPage;
