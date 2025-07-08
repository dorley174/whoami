import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Room {
  players: string[];
}

const RoomPage: React.FC = () => {
  const router = useRouter();
  const { code } = router.query;

  const [players, setPlayers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code || typeof code !== 'string') return;

    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${code}`);
        if (!res.ok) {
          setError('Room not found or expired');
          return;
        }
        const data: Room = await res.json();
        setPlayers(data.players);
        setError(null);
      } catch (e) {
        setError('Failed to fetch room data');
      }
    };

    fetchRoom();
    const intervalId = setInterval(fetchRoom, 3000); // опрос каждую 3 секунды

    return () => clearInterval(intervalId);
  }, [code]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Room: {code}</h1>
      <h2>Players:</h2>
      <ul>
        {players.length > 0 ? players.map((p) => <li key={p}>{p}</li>) : <li>No players yet</li>}
      </ul>
    </div>
  );
};

export default RoomPage;
