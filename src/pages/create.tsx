import { useState } from 'react';
import { useRouter } from 'next/router';
import BackButton from '@/components/backButton';
import styles from '../css/create.module.css';

const CreatePage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    const res = await fetch('/api/rooms/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname }),
    });
    const data = await res.json();
    setCode(data.code);
  };

  const handleJoin = () => {
    router.push(`/rooms/${code}`);
  };

  return (
    <main>
      <BackButton></BackButton>
      <div className={styles.createmenu}>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Your nickname"
        />
        <button onClick={handleCreate}>Generate Room Code</button>
        {code && (
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
