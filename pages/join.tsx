import BackButton from '@/components/backButton';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const JoinPage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleJoin = async () => {
    setError('');
    if (!nickname || !code) {
      setError('Please enter both nickname and room code');
      return;
    }

    const res = await fetch('/api/rooms/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Failed to join the room');
      return;
    }

    // room join
    router.push(`/rooms/${code}`);
  };

  return (
    <main>
      <BackButton></BackButton>
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value.toUpperCase())}
      />
      <input
        type="text"
        placeholder="Room Code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        maxLength={6}
      />
      <button onClick={handleJoin}>Join</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
};

export default JoinPage;
