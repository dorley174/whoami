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
  const [inputValues, setInputValues] = useState<{ [id: string]: string }>({});

  // unique id
  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) setUserId(id);
  }, []);

  // nickname
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setNickname(localStorage.getItem('nickname'));
    }
  }, []);

  // notes from textarea
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

  // input values
  useEffect(() => {
    if (!code) return;
    const saved = localStorage.getItem(`inputValues_${code}`);
    if (saved) {
      try {
        setInputValues(JSON.parse(saved));
      } catch {}
    }
  }, [code]);

  // inputValues in localStorage
  useEffect(() => {
    if (!code) return;
    localStorage.setItem(`inputValues_${code}`, JSON.stringify(inputValues));
  }, [inputValues, code]);

  const handleInputChange = (id: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  // auto update in 5 sec
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
    const interval = setInterval(fetchRoom, 5000);
    return () => clearInterval(interval);
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

  if (!room || !nickname) return <p>Room is loading...</p>;

  return (
    <>
      <div className={styles.actives}>
        <div className={styles.spectators}>
          <h2 style={{ color: '#8e0000', textAlign: 'center' }}>Spectators</h2>
          <ul style={{ color: '#8e0000', textAlign: 'center' }}>
            {room.spectators.map((s) => (
              <li
                key={s.id}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                <p style={{ fontSize: '1.3rem', fontWeight: '500' }}>{s.nickname}</p>
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

        <div className={styles.right}>
          <ul className={styles.players}>
            {room.players.map((p) => (
              <div key={p.id} className={p.id === userId ? styles.you : styles.player}>
                {p.id === userId ? (
                  <p className={styles.playerguess}>???</p>
                ) : (
                  <input
                    type="text"
                    placeholder="Guessed person"
                    className={styles.playerguess}
                    value={inputValues[p.id] || ''}
                    onChange={(e) => handleInputChange(p.id, e.target.value)}
                  />
                )}
                <Image src={avatar} alt="avatar" className={styles.playerphoto} />
                <p className={styles.playername}>{p.nickname}</p>
              </div>
            ))}
          </ul>

          {room.players.some((p) => p.id === userId) && (
            <div
              style={{
                maxWidth: '100vw',
                display: 'flex',
                justifyContent: 'center',
                width: 'fit-content',
                margin: 'auto',
                borderRadius: '33px',
                border: '2px solid #2c304b',
              }}
            >
              <textarea
                placeholder="Your notes"
                className={styles.playernotes}
                rows={7}
                cols={40}
                value={textareas[userId!] || ''}
                onChange={(e) => handleTextareaChange(userId!, e.target.value)}
              />
            </div>
          )}
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
};

export default RoomPage;
