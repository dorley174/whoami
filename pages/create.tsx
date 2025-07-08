import { useState } from 'react';
import { useRouter } from 'next/router';
import BackButton from '@/components/backButton';
import styles from '@/css/create.module.css';

const CreatePage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    setError('');
    if (!nickname.trim()) {
      setError('Please enter your nickname');
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('/api/rooms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname }),
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
    <main>
      <BackButton />
      <div className={styles.createmenu}>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Your nickname"
          disabled={loading}
        />
        <button onClick={handleCreate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Room Code'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {code && !loading && (
          <>
            <p>Room Code: {code}</p>
            <button onClick={handleJoin}>Join Room</button>
          </>
        )}
      </div>
    </main>
  );
};

export default CreatePage;
