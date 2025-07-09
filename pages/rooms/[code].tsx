import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import avatar from '../../public/person.jpg';
import styles from '@/css/uroom.module.css';

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
  const [textareas, setTextareas] = useState<{ [id: string]: string }>({});

  // загружаем своё поле из localStorage
  useEffect(() => {
    if (userId) {
      const saved = localStorage.getItem(`textarea_${userId}`);
      if (saved) {
        setTextareas((prev) => ({ ...prev, [userId]: saved }));
      }
    }
  }, [userId]);

  const handleTextareaChange = (id: string, value: string) => {
    setTextareas((prev) => ({ ...prev, [id]: value }));
    if (id === userId) {
      localStorage.setItem(`textarea_${id}`, value);
    }
  };

  console.log('userId:', userId);
  console.log('room spectators:', room?.spectators);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) setUserId(id);
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
    <>
      <div className={styles.actives}>
        <div className={styles.spectators}>
          <h2 style={{ color: '#8e0000', textAlign: 'center' }}>Spectators</h2>
          <ul style={{ color: '#8e0000', textAlign: 'center' }}>
            {room.spectators.map((s) => (
              <li style={{ listStyleType: 'none', padding: 0, margin: 0 }} key={s.id}>
                {s.nickname}
                {s.id === userId && (
                  <button
                    disabled={loading}
                    className={styles.addbutton}
                    onClick={() => promote(s.nickname)}
                  >
                    +
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <hr className={styles.vline} />
        <ul className={styles.players}>
          {room.players.map((p) => {
            const isCurrentUser = p.id === userId;
            return (
              <>
                <div className={styles.playersarea}>
                  <div key={p.id} className={styles.player}>
                    <input
                      type="text"
                      placeholder="Guessed person"
                      className={styles.playerguess}
                    />
                    <Image src={avatar} alt="avatar" className={styles.playerphoto} />
                    <p className={styles.playername}>{p.nickname}</p>
                  </div>
                </div>
                {isCurrentUser && (
                  <textarea
                    placeholder="Your notes"
                    className={styles.playernotes}
                    rows={7}
                    cols={40}
                    value={textareas[p.id] || ''}
                    onChange={(e) => handleTextareaChange(p.id, e.target.value)}
                  />
                )}
              </>
            );
          })}
        </ul>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
};

export default RoomPage;
