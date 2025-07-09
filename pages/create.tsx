import { useState } from 'react';
import { useRouter } from 'next/router';
import BackButton from '@/components/backButton';
import CopyButton from '@/components/copyButtton';
import styles from '@/css/createjoin.module.css';
import { v4 as uuidv4 } from 'uuid';

const CreatePage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    setError('');
    if (!nickname.trim()) {
      setError('Enter your nickname');
      return;
    }
    setLoading(true);

    const id = uuidv4(); // ← Генерация ID здесь
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('userId', id);

    try {
      const res = await fetch('/api/rooms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, id }), // ← Отправка id и nickname
      });

      if (!res.ok) {
        const text = await res.text();
        setError(`Server error: ${text || res.statusText}`);
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!data.code) {
        setError('Invalid response from server');
        setLoading(false);
        return;
      }

      setCode(data.code);
    } catch (err) {
      setError('Network error or server is not responding');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = () => {
    if (code) {
      router.push(`/rooms/${code}`);
    }
  };

  return (
    <>
      <BackButton />
      <div className={styles.wrapper}>
        <div className={styles.createmenu}>
          <h1 style={{ color: '#8e0000' }}>Room settings</h1>
          <div className={styles.setting}>
            <p className={styles.settingtitle}>Time session:</p>
            <p className={styles.settinginput}>2 hours</p>
          </div>
          <div className={styles.setting}>
            <p className={styles.settingtitle}>Max people in room:</p>
            <p className={styles.settinginput}>12 members</p>
          </div>

          <input
            className={styles.nicknameinput}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Your nickname"
            disabled={loading}
          />

          <button className={styles.buttoncreate} onClick={handleCreate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Room Code'}
          </button>

          {error && <p className={styles.error}>{error}</p>}

          {code && !loading && (
            <>
              <hr className={styles.line} />
              <h1 style={{ color: '#8e0000' }}>Your room</h1>
              <div className={styles.roomcode}>
                <p className={styles.settingtitle}>Room Code:</p>
                <p className={styles.code}>{code}</p>
              </div>

              <div className={styles.buttons}>
                <button className={styles.joinbutton} onClick={handleJoin}>
                  Join Room
                </button>
                <CopyButton className={styles.joinbutton} copy={code} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatePage;
