import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function RoomPage() {
  const router = useRouter();
  const { code } = router.query;
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    if (!code) return;
    const fetchRoom = async () => {
      const res = await fetch(`/api/rooms/${code}`);
      if (res.ok) {
        const data = await res.json();
        setPlayers(data.players);
      }
    };
    fetchRoom();
  }, [code]);

  return (
    <div>
      <h1>Room: {code}</h1>
      <h2>Players:</h2>
      <ul>
        {players.map((player, idx) => (
          <li key={idx}>{player}</li>
        ))}
      </ul>
    </div>
  );
}
